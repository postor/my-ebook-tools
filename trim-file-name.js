import { readdirSync, renameSync, statSync } from 'fs'
import { join } from 'path'

const regexps = [
  /\(读客.*?\)/g,
  /读客经典文库：/g,
  /读客经典文库.*?-/g,
  /读客经典文库/g,
]

const dry = false

trimName()

function trimName(cwd = process.cwd()) {
  for (let name of readdirSync(cwd)) {
    let file = join(cwd, name)
    let stat = statSync(file)
    if (stat.isDirectory()) {
      return trimName(file)
    }
    if (stat.isFile()) {
      let t = name
      for (let reg of regexps) {
        t = t.replace(reg, '')
      }
      console.log(`${t}  <=  ${name}`)
      if (!dry) renameSync(file, join(cwd, t))
    }
  }
}