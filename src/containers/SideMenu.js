import React, { Component } from 'react'
import { connect } from 'react-redux'
/* COMPONENTS */
import Header from '../components/Header'
/* ACTION CREATORS */
import { logOutAct as logOut } from '../reducer/auth'
/* IMAGES */
import gear from '../icons/gear.png'
import logoutIcon from '../icons/logout.png'

class SideMenu extends Component {
  render() {
    return (
      <div className="flexed flexFill column">
        <Header back={false} right="remove" title={'Side menu'}/>
        <div className="flexed flexFill column alignStretch">
          <div className="flexed column scroll_y alignStretch paddingHorizontal-40">
            { this.props.routerToShow && this.props.routerToShow === 'matchOn' ?
              <button
                className="flexed JustifyStart paddingTop-30 white fontSize-18"
                onClick={() => this.props.history.push('/ranking')}
              >
                Classement
              </button>
              :
              null
            }
            <button
              className="flexed JustifyStart paddingTop-30 white fontSize-18"
              onClick={() => this.props.history.push({ pathname: '/allchallenges', state: {origin: '/sidemenu'} })}
            >
              Tous les défis
            </button>
            { this.props.routerToShow && this.props.routerToShow === 'matchOn' ?
              <button
                className="flexed JustifyStart paddingTop-30 white fontSize-18"
                onClick={() => this.props.history.push('/wallet')}
              >
                Cagnotte
              </button>
              :
              null
            }
            { this.props.routerToShow && this.props.routerToShow === 'matchOn' ?
              <button
                className="flexed JustifyStart paddingTop-30 white fontSize-18"
                onClick={() => this.props.history.push('/bonus')}
              >
                Gagner des Tricks
              </button>
              :
              null
            }
            <button
              className="flexed JustifyStart paddingTop-30 white fontSize-18"
              onClick={() => this.props.history.push('/infos')}
            >
              FAQ
            </button>
            <button
              className="marginTop-35 flexed JustifyStart alignCenter paddingTop-30 white fontSize-17"
              onClick={() => this.props.history.push('/parameters')}
            >
              <img
                className="iconSize-20 marginRight-10"
                src={gear}
                alt="Parametres"
              />
              Paramètres
            </button>
            <button
              className="flexed JustifyStart alignCenter paddingTop-30 white fontSize-17"
              onClick={() => {
                this.props.dispatch(logOut())
              }}
            >
              <img
                className="iconSize-20 marginRight-10"
                src={logoutIcon}
                alt="logout"
              />
              Log out
            </button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    routerToShow: state.auth.routerToShow
  }
}

export default connect(mapStateToProps)(SideMenu)
