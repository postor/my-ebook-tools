import { readdirSync, statSync, unlinkSync } from 'fs'
import { join } from 'path'
const preferExtensions = ['.epub', '.mobi', '.azw3', '.pdf', '.txt']

removeDuplicate()

function removeDuplicate(cwd = process.cwd()) {
  console.log(cwd)
  let files = new Map()
  for (let name of readdirSync(cwd)) {
    let file = join(cwd, name)
    if (statSync(file).isDirectory()) {
      removeDuplicate(file)
    } else {
      let ext = file.substring(file.lastIndexOf('.'))
      files.set(ext, file)
    }
  }
  if (!files.size) return
  let keep = findPreferedFile(files)
  if (!keep) {
    return console.log(`no match: ${cwd}`)
  }
  files.delete(keep)
  for (let f of files.values()) {
    unlinkSync(f)
    console.log(`unlinked: ${f}`)
  }
}

function findPreferedFile(files = new Map()) {
  for (let p of preferExtensions) {
    if (files.has(p)) return p
  }
  return ''
}