const fs = require ('fs')
const {join} = require ('path')

function *FilePaths ({dir, filter} = {}) {

	if (dir == null) throw new Error ('FilePaths: dir must be defined')
			
	if (typeof filter === 'string') {

		for (const directoryPath of dir) {
		
			const filePath = join (directoryPath, filter)
			
			if (fs.existsSync (filePath)) yield filePath

		}

	}
	else {

		if (filter == null) filter = () => true

		for (const directoryPath of dir) {

			for (const e of fs.readdirSync (directoryPath, {withFileTypes: true})) {

				if (!e.isFile ()) continue

				const {name} = e, filePath = join (directoryPath, name)

				if (filter (name, directoryPath, filePath)) yield filePath

			}

		}

	}
	
}

module.exports = FilePaths