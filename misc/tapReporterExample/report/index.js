import duplexer from 'duplexer'
import through2 from 'through2'
import parser from 'tap-parser'
const stringify = JSON.stringify;

export default () => {
  const output = through2()
  const p = new parser({ omitVersion: true })
  const stream = duplexer(p, output)

  const println = msg => process.stdout.write(msg)

  p.on('assert', (assert) => {
    println(`*************** assert ${stringify(assert)}`)
  })

  p.on('complete', (assert) => {
    println(`*************** complete ${stringify(assert)}`)
  })

  p.on('bailout', (child) => {
    println(`*************** bailout ${stringify(child)}`)
  })

  return stream
}
