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
const $closeAddDialog = D.getElementById("closeDialogButton")
const $addDialog = D.getElementById("addDialog")

const $detailsDialog = D.getElementById("detailsDialog")
const $contentContainer = D.getElementById("detailsContent")
const $closeDetailsDialog = D.getElementById("detailsDialogClose")

let $$listItems = document.querySelectorAll(".list-item")

// DOM Node creations

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
			const elementValues = Object.entries(element.formDataObject).filter(
				([key]) => (key === "company") | (key === "job") | (key === "status")
			)

			console.log(elementValues)
			elementValues.forEach((value) => {
				const tableData = document.createElement("td")
				tableData.innerHTML = value[1]
				tableRow.appendChild(tableData)
			})

			let $applicationDetailsButton = document.createElement("button")
			$applicationDetailsButton.innerText = "Details"
			$applicationDetailsButton.id = `DetailsButtonRow${element.id}`
			//rowId = $applicationDetailsButton.id

			$applicationDetailsButton.onclick = () => onOpenDetailsDialog(element.id)
			tableRow.appendChild($applicationDetailsButton)
			$overViewTable.appendChild(tableRow)
		})
	} else {
		$overViewTable.innerText = "List is empty create entry"
	}
}

let createDetailsContent = (applicationId) => {
	let applications = state.applications

	console.log(applications)

	$$listItems.forEach(($item, idx) => {
		let item = applications[idx]
		console.log(item)
		console.log($item)
		if (item) {
			$item.querySelector("#company").textContent = item.formDataObject.company
			$item.querySelector("#job").textContent = item.formDataObject.job
			$item.querySelector("#contact").textContent = item.formDataObject.contact
			$item.querySelector("#location").textContent =
				item.formDataObject.location
			$item.querySelector("#jobtype").textContent = item.formDataObject.jobtype
			$item.querySelector("#source").textContent = item.formDataObject.source
			$item.querySelector("#requirements").textContent =
				item.formDataObject.requirements
			$item.querySelector("#status").textContent = item.formDataObject.status
		}
	})
}
// (5) Event handlers - are called from eventlisteners in the event bindings

let onCreate = () => {
	$addDialog.showModal()
}

let onDeleteAll = () => {
	deleteApplication()
	updateApplicationsTable()
}

let onSubmitNew = (e) => {
	e.preventDefault()

	addNewApplication($formElements)

	$createApplicationForm.reset()
	$addDialog.close()
	updateApplicationsTable()
}

let onCloseAddDialog = () => {
	$addDialog.close()
	$createApplicationForm.reset()
}
let onCloseDetailsDialog = () => {
	$detailsDialog.close()
}
let onOpenDetailsDialog = (applicationId) => {
	$detailsDialog.showModal()
	createDetailsContent(applicationId)
}
// (6) event bindings

$create.onclick = () => onCreate()

$deleteAll.onclick = () => onDeleteAll()

$createApplicationForm.onsubmit = (e) => onSubmitNew(e)

$closeAddDialog.onclick = () => onCloseAddDialog()

$closeDetailsDialog.onclick = () => onCloseDetailsDialog()

// (7) initial state

setReady()
updateView()
loadApplications()
updateApplicationsTable()
console.log(state)

// document.addEventListener("DOMContentLoaded", () => {})
