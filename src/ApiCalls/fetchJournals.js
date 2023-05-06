import journalData from "../data"

const fetchJournal = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(journalData)
    }, 500)
  })
}

export default fetchJournal