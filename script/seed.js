'use strict'

const db = require('../server/db')
const {User, WordPrompts} = require('../server/db/models')
const wordPrompts = require('./wordPrompts.json')

//helper function to convert the wordPrompts.json into an JS object array
function convertWordPrompts(jsonArr) {
  const convertedWordPrompts = []

  for (let i = 0; i < jsonArr.length; i++) {
    const name = jsonArr[i].name
    convertedWordPrompts.push({name})
  }
  console.log(convertedWordPrompts)
  return convertedWordPrompts
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([

    User.create({username: 'ready2win'}),
    User.create({username: 'ready2draw'})
  ])

  const prompts = await Promise.all([
    WordPrompts.bulkCreate(convertWordPrompts(wordPrompts))
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${prompts.length} bulkCreate of prompts`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
