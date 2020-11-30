import Settings from "../serivces/settings";

export const StatusENum = [
  {
    name: Settings.translations.pending_text,
    value: 1
  },
  {
    name: Settings.translations.rejected_text,
    value: 2
  }

]


export const getStatusEnum = (value) => {
  let text
  StatusENum.map(item => {

    if (item.value === value) {
      text = item.name
    }
  })
  return text
}
