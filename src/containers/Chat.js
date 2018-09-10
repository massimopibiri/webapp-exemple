import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { animateScroll } from 'react-scroll'
/* COMPONENTS */
import Header from '../components/Header'
import LinkedChall from '../components/LinkedChall'
import ListChallenges from '../components/ListChallenges'
import ListComments from '../components/ListComments'
import Modal from '../components/Modal'
import Tabbar from '../components/Tabbar'
import TagBox from '../components/TagBox'
/* ACTION CREATORS */
// import { setPreviousNotifs } from '../reducer/notifications'
import { addAlert } from '../reducer/alerts'
import { showModal } from '../reducer/tools'
import { openTag, addTaggedPlayers, linkChallenge, resetTaggedPlayers,loadchats, storeComments, fetchOlderComments, fetchNewerComments } from '../reducer/chats'
/* HELPERS */
import {
  editComment,
  detectNewTag,
  filterListTag,
  // formatTags,
  getTaggedInInput,
  removeHashKey
} from '../helpers/notifs'
/* IMAGES */
import loading from '../icons/loading1.gif'
import send from '../icons/send.png'
import at from '../icons/at.png'
import hash from '../icons/hash.png'
/* SETTINGS */
import { defaultValues } from '../globals/setting'


class Chats extends Component {
  constructor() {
    super()
    this.commentInputBox = this.commentInputBox.bind(this)
    this.onChooseTag = this.onChooseTag.bind(this)
    this.fetchOlderData = this.fetchOlderData.bind(this)
    this.fetchNewerData = this.fetchNewerData.bind(this)
    this.onHashTagFunc = this.onHashTagFunc.bind(this)
    this.renderHashTagChalls = this.renderHashTagChalls.bind(this)
    this.renderLinkedChallenge = this.renderLinkedChallenge.bind(this)
    this.renderTagPlayers = this.renderTagPlayers.bind(this)
    this.sendComment = this.sendComment.bind(this)
    this.onRemoveHashTag = this.onRemoveHashTag.bind(this)
    this.state = {
      comment: '',
      tagRegex: null
    }
  }
  componentDidMount() {
    this.props.dispatch(loadchats(defaultValues.nbOfCommentsPerPage))
    .then((result) => {
      if (result && result.data && result.data.comments) {
        this.props.dispatch(storeComments(result.data.comments, result.data.currentTime, result.data.tagPlayers))
        animateScroll.scrollToBottom({
          containerId: 'scrollPosition',
          duration: 0
        })
      }
    })
    .catch((error) => {
      console.log(error)
    })
    // close modals
    this.props.dispatch(showModal('none'))
    // reset the tagged players
    this.props.dispatch(resetTaggedPlayers())
    // reset the comment input
    this.setState({comment: ''})
  }

  // ===>>> LIST OF CHALLENGES TO HASHTAG
  renderHashTagChalls() {
    return(
      <Modal
        show={this.props.showMod}
        onClose={() => this.onShowModal('none')}
      >
        <div className="flexed flexFill scroll_y">
          { this.props.hashTagList && this.props.hashTagList.length > 0 ?
            <ListChallenges
              list={this.props.hashTagList}
              listFunction={this.onHashTagFunc}
              origin={'hashTag'}
            />
            :
            <img
              className="loading iconSize-40 marginBottom-50"
              src={loading}
              alt="loading"
            />
          }
        </div>
      </Modal>
    ) 
  }
  // -------->>> FUNCTIONS FOR HASHTAG
    onShowModal(string) {
      // call server to get the list of challenges to comment
      if (string === 'hashTag' && this.context.websocket) {
        this.context.websocket.emit('getHashTagChalls', {})
      } else if (string === 'hashTag' && !this.context.websocket) {
        this.props.dispatch(addAlert('danger', 'Veuillez recharger la page'))
      }
      // show the list of challenges
      this.props.dispatch(showModal(string))
      // close the tag window
      this.props.dispatch(openTag(false))
    }
    // action when clicked on a challenge
    onHashTagFunc(challenge) {
      // select a challenge
      this.props.dispatch(linkChallenge(challenge))
      // close the hashtag window
      this.props.dispatch(showModal('none'))
    }
  // ------------------

  // ====>>> WINDOW TO SHOW HASHTAGGED CHALLENGE
  renderLinkedChallenge() {
    if (this.props.challengeToComment && this.props.showMod === 'none') {
      return(
        <LinkedChall
          challenge={this.props.challengeToComment}
          authorizeTag={this.props.showTag}
          removeHashTag={this.onRemoveHashTag}
        />
      )
    } else {
      return null 
    }
  }
  // -------->>> FUNCTIONS OF THE LINKED CHALLENGE
    onRemoveHashTag() {
      this.props.dispatch(linkChallenge(null))
    }
  // ------------

  // ===>>> LIST OF PLAYERS TO TAG
  renderTagPlayers(wordInWriting = null, listTaggedInInput = []) {
    const namesToDisplay = filterListTag(wordInWriting, this.props.allPlayers)
    if (namesToDisplay && namesToDisplay.length > 0 && this.props.showTag && this.props.showTag === true) {
      return(
        <TagBox
          tagPlayers={namesToDisplay}
          chooseTag={this.onChooseTag}
          wordInWriting={wordInWriting}
        />
      ) 
    }
    return null
  }
  // -------->>> FUNCTIONS FOR TAG
      // open tag with button
      addTag() {
        this.setState((prevState) => {
          let newComment
          if ((!prevState.comment || prevState.comment.length <= 0) && this.props.showTag === false) {
            newComment = '@'
          } else if (prevState.comment[prevState.comment.length - 1] === ' ' && this.props.showTag === false) {
            newComment = prevState.comment + '@'
          } else if (this.props.showTag === false) {
            newComment = prevState.comment + ' @'
          } else {
            newComment = prevState.comment
          }
          return {
            comment: newComment 
          }
        })
        this.props.dispatch(openTag(!this.props.showTag))
      }
      // called when a player is tagged
      onChooseTag(userToTag, wordInWriting) {
        // check if the player already exists in the tagged list (list of players to tag when recording the comment in the server)
        if (this.props.taggedPlayers.map((player) => {return player}).indexOf(userToTag) < 0) {
          // add the player in the list
          this.props.dispatch(addTaggedPlayers(userToTag))
        }
        // edit the new comment with the tag added in text
        const commentEdited = editComment(this.state.comment, this.props.allPlayers, userToTag, wordInWriting)
        // save in state the new comment
        this.setState({
          comment: commentEdited.newComment, // => set new comment
        })
        this.props.dispatch(openTag(false))
        // set focus on input
        this.nameInput.focus()
      }
  // ----------------------

  // ===>>> INPUT AND BUTTONS TAG & HASH
  commentInputBox() {
    return (
      <div className={
        (this.props.showTag && this.props.showTag === true) || this.props.challengeToComment
        ?
        'flexed column alignStretch justifyCentered bg_white paddingHorizontal-15 zIndex-1'
        :
        'flexed column alignStretch justifyCentered bg_white paddingHorizontal-15 borderTop1Color-2 zIndex-1'
      }>
        <div className="flexed alignCenter justifySpaceBetween paddingBottom-5">
          <input
            type="text"
            // onKeyUp={this.handleKey}
            // autoFocus
            autoComplete="off"
            value={this.state.comment}
            placeholder='Message #general-hors-wdmh'
            ref={(input) => { this.nameInput = input }}
            onChange={(event) => this.onWriteComment(event)}
            onKeyUp={(event) => this.detectButton(event)}
            className="flexed flexFill fontSize-18 height-50"
          />
          <button
            className="twentyBoxIconSize marginLeft-10"
            onClick={() => {
              this.sendComment()
            }}
          >
            <img
              src={send}
              alt="send-icon"
              className="imgFillParent"
            />
          </button>
        </div>
        <div className="flexed alignCenter paddingBottom-10">
          {/* BUTTONS HASH */}
          <button
            className="twentyBoxIconSize"
            onClick={() => this.onShowModal('hashTag')}
          >
            <img
              src={hash}
              alt="hash-icon"
              className="imgFillParent"
            />
          </button>
          {/* BUTTONS TAG */}
          <button
            className="twentyBoxIconSize marginLeft-20"
            onClick={() => {
              this.addTag()
            }}
          >
            <img
              src={at}
              alt="at-icon"
              className="imgFillParent"
            />
          </button>
        </div>
      </div>
    )
  }
  // -------->>> FUNCTIONS FOR INPUT
      onWriteComment(event) {
        this.setState({comment: removeHashKey(event.target.value)})
      }
      // open tag with character ===> '@'
      detectButton(event) {
        // OPEN tag
        if (event && event.key && event.key === '@') {
          this.props.dispatch(openTag(true))
        // OPEN HASHTAG
        } else if (event && event.key && event.key === '#') {
          // call server to get the list of challenges to comment
          if (this.context.websocket) {
            this.context.websocket.emit('getHashTagChalls', {})
          }
          // show the list of challenges
          this.props.dispatch(showModal('hashTag'))
          // close the tag window
          this.props.dispatch(openTag(false))
        // CLOSE
        } else if (event && event.key && event.key === ' ') {
          this.props.dispatch(openTag(false))
        }
      }
      sendComment() {
        if (
          this.context.websocket
          && this.state.comment
          && this.state.comment.length > 0
        ) {
          this.context.websocket.emit('recComment', {
            comment: this.state.comment,
            taggedPlayers: this.props.taggedPlayers,
            challengeToComment: this.props.challengeToComment
          })
          // save in state the new comment
          this.setState({comment: ''})
          // close the linked challenge
          this.props.dispatch(linkChallenge(null))
          animateScroll.scrollToBottom({
            containerId: 'scrollPosition',
            duration: 1000
          })
        } else {
          this.props.dispatch(addAlert('cool', 'Veuillez recharger la page'))
        }
      }
  // ---------------

  // infinite scroll fetching
  fetchOlderData() {
    this.props.dispatch(fetchOlderComments(defaultValues.nbOfCommentsPerPage, this.props.chunck))
  }
  fetchNewerData() {
    if (this.props.chunck && this.props.chunck >= 3 && this.props.loadingNewer === false) {
      this.props.dispatch(fetchNewerComments(defaultValues.nbOfCommentsPerPage, this.props.chunck)) 
    }
  }

  render() {
    // extract the list of players name  tagged in the input text
    const listTaggedInInput = getTaggedInInput(this.state.comment)
    // get the tag currently in writing
    const newTag = detectNewTag(this.props.allPlayers, listTaggedInInput)
    return (
      <div className="flexed flexFill column relativePos bg_white">
        <Header back={false} right="burger" title="Chat"/>
        <div className="flexed flexFill alignStretch justifyCentered">
          {/* LIST COMMENTS */}
          { this.props.comments && this.props.comments.length > 0 ?
            <ListComments
              list={this.props.comments}
              userId={localStorage.getItem('TrickyAppId')}
              currentTime={this.props.currentTime}
              fetchOlderData={this.fetchOlderData}
              fetchNewerData={this.fetchNewerData}
              loadingOlder={this.props.loadingOlder}
              loadingNewer={this.props.loadingNewer}
            />
            :
            <img
              className="loading"
              alt="loading-icon"
              src={loading}
            />
          }
        </div>

        { /* TAGBOX -> Check if the user are typing a tag */ }
        { this.renderTagPlayers(newTag.wordInWriting, listTaggedInInput) }
        { /* HASHBOX -> Check if the user are typing a hashtag */ }
        { this.renderHashTagChalls() }
        { /* LINKED CHALLENGE */ }
        { this.renderLinkedChallenge() }
        {/* INPUT TO WRITE COMMENTS */}
        {this.commentInputBox()}
        <Tabbar/>
      </div>
    )
  }
}
// access context.type to get the store to pass to socket.io initialization
Chats.contextTypes = {
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    // comment: state.form.comment,
    position: state.formFuncs.position,
    hashTagList: state.chats.hashTagList,
    challengeToComment: state.chats.challengeToComment,
    comments: state.chats.comments,
    currentTime: state.chats.currentTime,
    allPlayers: state.chats.tagPlayers,
    loadingOlder: state.chats.loadingOlder,
    loadingNewer: state.chats.loadingNewer,
    taggedPlayers: state.chats.taggedPlayers,
    showMod: state.tools.showMod,
    chunck: state.chats.chunck,
    showTag: state.chats.showTag
  }
}

export default connect(mapStateToProps)(Chats)
