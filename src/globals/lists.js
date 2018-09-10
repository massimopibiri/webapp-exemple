export const gainData = [
  {
    _id: 1,
    title: 'fnac'
  },
  {
    _id: 2,
    title: 'lafayette'
  },
  {
    _id: 4,
    title: 'disney'
  }
]

export const byCategories = [
  {
    arg: 'services',
    title: 'Services',
    list: []
  },
  {
    arg: 'themes',
    title: 'Thèmes',
    list: [
      {
        arg: 'tabac',
        title: 'Tabac'
      },
      {
        arg: 'food',
        title: 'Nourriture'
      }, /* 
      {
        arg: 'sport',
        title: 'Sport'
      },
      {
        arg: 'relax',
        title: 'Relaxation'
      } */
    ]
  },
  {
    arg: 'month',
    title: 'Partie',
    list: [
      {
        arg: 'current',
        title: 'Partie courrante'
      },
      {
        arg: 'previous',
        title: 'Dernière partie'
      },
      {
        arg: 'before-last',
        title: 'Avant-dernière partie'
      }
    ]
  },
  {
    arg: 'program',
    title: 'Programme',
    list: []
  }
]
