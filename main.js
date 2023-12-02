//Constants and state(app Data)

/* EXAMPLE:

const TODAY = Date.now()
const LOADING = 0, READY = 1, ERROR = 2

let state = { ... } */

let applications = [
	{
		/* 1:	{
		selected: false,
		company: "",
		job: "",
		contact: "",
		location: "",
		jobtype: "",
		status: "",
		requirements: [""],
		source: "",
	}, */
	},
]

//functions for working with the data.

/* EXAMPLE:

let setLoading = () => state.view = LOADING
let setReady = () => state.view = READY
let isLoading = () => state.view === LOADING
let isReady = () => state.view === READY

let loadSongs = () => fetch('/api/songs/)
  .then(res => res.json())
  .then(data => {
    state.songs = data.songs
    state.view = READY
  })
  .catch(() => state.view = ERROR) */

//DOM node references

/* let D = document
let $play = D.getElementById('play')
let $stop = D.getElementById('stop')
let $viewLoading = D.getElementById('view-loading')
let $viewReady = D.getElementById('view-ready')
let $$instruments = D.querySelectorAll('.instrument-option') */
const D = document
const createButton = document.getElementById("createButton")
const deleteList = document.getElementById("deleteList")
const overViewTable = document.getElementById("tbody")
const createApplicationForm = document.getElementById("createApplicationForm")
const formElements = document.getElementById("createApplicationForm")

const createApplicationButton = document.getElementById(
	"createApplicationButton"
)
const closeDialogButton = document.getElementById("closeDialogButton")
const addApplicationDialog = document.getElementById("addApplicationDialog")

const applicationDetailsDialog = document.getElementById(
	"applicationDetailsDialog"
)
const applicationDetailsDialogClose = document.getElementById(
	"applicationDetailsDialogClose"
)

//DOM update functions

/* let updateView = () => {
	$viewLoading.classList.toggle('hidden', !isLoading())
	$viewReady.classList.toggle('hidden', !isReady())
	$viewError.classList.toggle('hidden', !isError())
  }
  let updateSongDetails = (songData, index) => {
	let $song = $$songs[index]
	$song.querySelector('.active')
	  .classList.toggle('hidden', !isSelected(index))
	$song.querySelector('.title').textContent = songData.title
	$song.querySelector('.tempo').textContent = songData.tempo + 'bpm'
  }
  let updateSongs = () => state.songs.forEach(updateSongDetails) */

//Event handlers - are called from eventlisteners in the event bindings

/* let onPlay = () => {
	setPlay()
	updatePlaybackButton()
	updateScoresheet()
	startPlaybackTimer()
  }
  let onStop = () => {
	stopPlaybackTimer()
	setStop()
	updatePlaybackButton()
	updateScoresheet()
  }
  let onEdit = scores => {
	onStop()
	setScores(scores)
	updateScoresheet()
  }
  let onSongLoaded = () => {
	setInitialScores()
	updateScoresheet()
	updatePlaybackButton()
	updateLoadError()
  }
  let onLoadSong = songId => {
	onStop()
	loadSong(songId).then(onSongLoaded)
  } */

//event bindings

/* $play.onclick = () => onPlay()
$stop.onclick = () => onStop()
$scoreEditor.oninput = ev => onEdit(ev.target.value) */

//initial state

/*
setReady()
updateView() */

const addNewApplication = (application) => {
	//TODO
	// reload site or rerender table after adding
	//https://stackoverflow.com/questions/10841239/enabling-refreshing-for-specific-html-elements-only
	let formData = new FormData(application)
	let formDataObject = Object.fromEntries(formData) // gibt Objekt mit key/value Paaren zurück aus Instanz formData

	let existing = localStorage.getItem("applications")
	existing = existing ? JSON.parse(existing) : []
	let id = existing.length ? existing[existing.length - 1].id + 1 : 0
	formDataObject = { id: id, formDataObject }
	existing.push(formDataObject)
	localStorage.setItem("applications", JSON.stringify(existing))

	/* 	formDataValues = Object.values(formDataObject)
	const newRow = document.createElement("tr")
	const checkBox = document.createElement("td")
	checkBox.innerHTML = `<input type="checkbox" />&nbsp;`
	newRow.appendChild(checkBox)

	formDataValues.forEach((value) => {
		const tableData = document.createElement("td")
		tableData.innerHTML = value
		newRow.appendChild(tableData)
	})

	overViewTable.appendChild(newRow) */
}

const updateApplication = () => {}

const deleteApplication = () => {
	localStorage.removeItem("applications")
}

let rowId = ""

const createRows = () => {
	let existing = localStorage.getItem("applications")

	existing = existing ? JSON.parse(existing) : []

	if (existing.length) {
		existing.forEach((element) => {
			let tableRow = document.createElement("tr")
			const checkBox = document.createElement("td")
			checkBox.innerHTML = `<input type="checkbox"  />&nbsp;`
			tableRow.appendChild(checkBox)
			const elementValues = Object.values(element.formDataObject)
			elementValues.forEach((value) => {
				const tableData = document.createElement("td")
				tableData.innerHTML = value
				tableRow.appendChild(tableData)
			})
			const applicationDetailsButton = document.createElement("button")
			applicationDetailsButton.innerText = "Details"
			applicationDetailsButton.id = `DetailsButtonRow${element.id}`
			rowId = applicationDetailsButton.id
			applicationDetailsButton.addEventListener("click", () => {
				applicationDetailsDialog.showModal()
				createDetailsContent(elementValues)
			})
			tableRow.appendChild(applicationDetailsButton)
			overViewTable.appendChild(tableRow)
		})
	} else {
		overViewTable.innerText = "List is empty create entry"
	}
}

document.addEventListener("DOMContentLoaded", () => {
	createRows()
})

const createDetailsContent = (applicationValues) => {
	applicationDetailsDialog.innerHTML = ""
	const contentContainer = document.createElement("div")
	applicationValues.forEach((value) => {
		const valueDiv = document.createElement("div")
		valueDiv.innerText = value
		contentContainer.appendChild(valueDiv)
	})
	applicationDetailsDialog.appendChild(contentContainer)
}

createButton.addEventListener("click", () => {
	addApplicationDialog.showModal()
})

deleteList.addEventListener("click", () => {
	deleteApplication()
	location.reload()
})

closeDialogButton.addEventListener("click", () => {
	addApplicationDialog.close()
	createApplicationForm.reset()
})

createApplicationForm.addEventListener("submit", (e) => {
	e.preventDefault()

	addNewApplication(formElements)

	createApplicationForm.reset()
	addApplicationDialog.close()
	location.reload()
})
