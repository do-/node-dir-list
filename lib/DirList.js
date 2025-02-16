const fs = require ('fs')
const {sep} = require ('path')
const FilePaths = require ('./FilePaths')

class DirPaths {

	constructor ({root, filter}) {
				
		this.filter = filter

		this.layers = []

		this.indexes = []

		this.path = []
		
		this.add ([...root])

	}

	add (dir) {

		this.layers.push (dir)

		this.indexes.push (0)
	
		this.path.push (dir [0])

	}

	next () {
		
		while (true) {

			if (this.layers.length === 0) return {done: true}

			const value = this.path.join (sep)

			const ok = this.filter (value, this.path)

			let next = []; for (const e of fs.readdirSync (value, {withFileTypes: true})) if (e.isDirectory ()) next.push (e.name)

			if (next.length === 0) {

				while (this.layers.length !== 0) {

					const last = this.layers.length - 1, layer = this.layers [last]

					const idx = ++ this.indexes [last]

					if (idx < layer.length) {

						this.path [last] = layer [idx]

						break

					}

					this.layers.pop ()

					this.indexes.pop ()

					this.path.pop ()

				}

			}
			else {

				this.add (next)

			}

			if (ok) return {value}
		
		}

  	}

	[Symbol.iterator] () {
	
		return this
	
	}
	
}

class DirList {

	constructor ({root, filter, live} = {}) {
	
		if (root == null) throw new Error ('DirList: root must be defined')

		if (typeof root === 'string') root = [root]

		if (typeof root [Symbol.iterator] !== 'function') throw new Error ('DirList: root must be a string or an iterator')
		
		if (filter === undefined) filter = () => true

		if (typeof filter !== 'function') throw new Error ('DirList: filter must be a function')

		this.dir = {root, filter}

		this.live = live === undefined ? true : !!live
	
	}

	[Symbol.iterator] () {

		const paths = new DirPaths (this.dir); if (this.live) return paths
		
		const cache = [...paths]
		
		return (this [Symbol.iterator] = () => cache [Symbol.iterator] ()) ()
	
	}

	files (filter) {

		return FilePaths ({dir: this, filter})

	}

}

module.exports = DirList