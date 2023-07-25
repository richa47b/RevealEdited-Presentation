class Enum {
  constructor(...keys) {
    keys.forEach((key, i) => {
      this[key] = i
    })
    Object.freeze(this)
  }

  *[Symbol.iterator]() {
    for (let key of Object.keys(this)) yield key
  }
}

export const StatesEnum = new Enum(
  'OUTLINE',
  'NOT_DEFINED',
  'WHITEBOARD',
  'SLIDE',
  'MEDIA',
  'MENU',
  'INTRODUCTION',
  'ANNOTATION',
  'TOOLBAR',
  'TRANSFORM_TOOLBAR'
)
export const StatesEnums = [...StatesEnum] // Array of the enum values as strings
