const Path = require ('path')
const {DirList, FilePaths} = require ('..')

test ('bad', () => {
	
	expect (() => {FilePaths ().next ()}).toThrow ()
	
	expect (() => {FilePaths ({dir: -1}).next ()}).toThrow ()

})

test ('no_filter', () => {

	const dir = new DirList ({
		root: ['root1', 'root2'].map (i => Path.join (__dirname, 'data', i)),
		filter: (s, a) => a.at (-2) === 'dw'
	})

	expect ([...dir.files ()]).toHaveLength (4)

})

test ('string_filter', () => {

	const dir = new DirList ({
		root: ['root1', 'root2'].map (i => Path.join (__dirname, 'data', i)),
		filter: (s, a) => a.at (-2) === 'dw'
	})

	expect ([...dir.files ('tb_houses.js')]).toHaveLength (4)
	expect ([...dir.files ('vw_houses.js')]).toHaveLength (0)

})

test ('lambda_filter', () => {

	const dir = new DirList ({
		root: ['root1', 'root2'].map (i => Path.join (__dirname, 'data', i)),
	})

	expect ([...dir.files ((name, dir) => /^tb_houses/.test (name) && /\boltp\b/.test (dir))]).toHaveLength (4)

})