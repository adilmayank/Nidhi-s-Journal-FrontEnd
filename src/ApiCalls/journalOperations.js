import journalData from '../data'

const journalOperations = async (type, journalId, journalNewData = null) => {
  let journals
  if (type === 'create') {
    journals = [...journalData, { id: journalData.length + 1, journalNewData }]
  } else if (type === 'update') {
    journals = journalData.map((journal, i) => {
      if (journal.id === journalId) {
        journal = { ...journal, journalNewData }
      }
      return journal
    })
  } else if (type === 'remove') {
    journals = journalData.filter((journal) => {
      if (journal.id !== journalId) {
        return journal
      }
    })
  }

  console.log(journals)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(journals)
    }, 1000)
  })
}

export default journalOperations
