// (1) Constants and state(app Data)
const LOADING = 0,
	READY = 1,
	ERROR = 2

let state = {
	applications: [],
	view: 0,
}
let rowId = "" // in state einfügen

// (2) functions for working with the data.

let setLoading = () => (state.view = LOADING)
let setReady = () => (state.view = READY)
let isLoading = () => state.view === LOADING
let isReady = () => state.view === READY
let isError = () => state.view === ERROR

let loadApplications = () => {
	let existing = localStorage.getItem("applications")
	existing = existing ? JSON.parse(existing) : []

	state.applications = existing
	console.log(state.applications)
}

let addNewApplication = (application) => {
	let formData = new FormData(application)
	let formDataObject = Object.fromEntries(formData) // gibt Objekt mit key/value Paaren zurück aus Instanz formData

	let applications = state.applications
	let id = applications.length
		? applications[applications.length - 1].id + 1
		: 0
	formDataObject = { id: id, formDataObject }
	applications.push(formDataObject)
	localStorage.setItem("applications", JSON.stringify(applications))
}

const updateApplication = () => {}
const deleteApplication = () => {
	//state/appdata loeschen statt quelle (localstorage löschen) x die quelle muss auch geupdatet werden
	//state an anderen stellen nutzen um daten zum beispiel anzuzeigen
	state.applications = []
	localStorage.removeItem("applications")
}

// (3) DOM node references

const D = document
const $viewLoading = D.getElementById("view-loading")
const $viewReady = D.getElementById("view-ready")
const $viewError = D.getElementById("view-error")

const $create = D.getElementById("createButton")
const $deleteAll = D.getElementById("deleteList")
const $overViewTable = D.getElementById("tbody")
const $createApplicationForm = D.getElementById("createApplicationForm")
const $formElements = D.getElementById("createApplicationForm")

const $createApplicationButton = D.getElementById("createApplicationButton")
const $closeDialogButton = D.getElementById("closeDialogButton")
const addApplicationDialog = D.getElementById("addApplicationDialog")

const $applicationDetailsDialog = D.getElementById("applicationDetailsDialog")
const $applicationDetailsDialogClose = D.getElementById(
	"applicationDetailsDialogClose"
)

// (4) DOM update functions
let updateView = () => {
	$viewLoading.classList.toggle("hidden", !isLoading())
	$viewReady.classList.toggle("hidden", !isReady())
	$viewError.classList.toggle("hidden", !isError())
}

let updateApplicationsTable = () => {
	$overViewTable.innerHTML = ""
	if (state.applications.length) {
		state.applications.forEach((element) => {
			console.log(Object.keys(element.formDataObject))

			let tableRow = document.createElement("tr")
			const checkBox = document.createElement("td")
			checkBox.innerHTML = `<input type="checkbox"  />&nbsp;`
			tableRow.appendChild(checkBox)
			const elementValues = Object.values(element.formDataObject).filter
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
				$applicationDetailsDialog.showModal()
				createDetailsContent(elementValues)
			})
			tableRow.appendChild(applicationDetailsButton)
			$overViewTable.appendChild(tableRow)
		})
	} else {
		$overViewTable.innerText = "List is empty create entry"
	}
}

let createDetailsContent = (applicationValues) => {
	$applicationDetailsDialog.innerHTML = ""
	const contentContainer = document.createElement("div")
	applicationValues.forEach((value) => {
		const valueDiv = document.createElement("div")
		valueDiv.innerText = value
		contentContainer.appendChild(valueDiv)
	})
	$applicationDetailsDialog.appendChild(contentContainer)
}
// (5) Event handlers - are called from eventlisteners in the event bindings

let onCreate = () => {
	addApplicationDialog.showModal()
}

let onDeleteAll = () => {
	deleteApplication()
	updateApplicationsTable()
}

let onSubmitNew = (e) => {
	e.preventDefault()

	addNewApplication($formElements)

	$createApplicationForm.reset()
	addApplicationDialog.close()
	updateApplicationsTable()
}

let onCloseDialog = () => {
	addApplicationDialog.close()
	$createApplicationForm.reset()
}
// (6) event bindings

$create.onclick = () => onCreate()

$deleteAll.onclick = () => onDeleteAll()

$createApplicationForm.onsubmit = (e) => onSubmitNew(e)

$closeDialogButton.onclick = () => onCloseDialog()

// (7) initial state

setReady()
updateView()
loadApplications()
updateApplicationsTable()
console.log(state)

// document.addEventListener("DOMContentLoaded", () => {})
