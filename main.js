//DOM Elements

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

const applicationDetailsButton = document.getElementById(
	"applicationDetailsButton"
)
const applicationDetailsDialog = document.getElementById(
	"applicationDetailsDialog"
)
const applicationDetailsDialogClose = document.getElementById(
	"applicationDetailsDialogClose"
)

const applicationDetailsDialogContent = document.getElementById(
	"applicationDetailsDialogContent"
)

////////

//Data Model

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

const addNewApplication = (application) => {
	//TODO
	// reload site or rerender table after adding
	//https://stackoverflow.com/questions/10841239/enabling-refreshing-for-specific-html-elements-only
	let formData = new FormData(application)
	let formDataObject = Object.fromEntries(formData) // gibt Objekt mit key/value Paaren zurück aus Instanz formData
	let existing = localStorage.getItem("applications")
	existing = existing ? JSON.parse(existing) : []
	console.log(existing)
	existing.push(formDataObject)
	localStorage.setItem("applications", JSON.stringify(existing))

	formDataValues = Object.values(formDataObject)
	const newRow = document.createElement("tr")
	const checkBox = document.createElement("td")
	checkBox.innerHTML = `<input type="checkbox" />&nbsp;`
	newRow.appendChild(checkBox)

	formDataValues.forEach((value) => {
		const tableData = document.createElement("td")
		tableData.innerHTML = value
		newRow.appendChild(tableData)
	})

	overViewTable.appendChild(newRow)
}

const updateApplication = () => {}

const deleteApplication = () => {
	localStorage.removeItem("applications")
}

document.addEventListener("DOMContentLoaded", () => {
	let existing = localStorage.getItem("applications")
	existing = existing ? JSON.parse(existing) : []
	existing.length
		? existing.forEach((element) => {
				let tableRow = document.createElement("tr")
				const checkBox = document.createElement("td")
				checkBox.innerHTML = `<input type="checkbox"  />&nbsp;`
				tableRow.appendChild(checkBox)
				const elementValues = Object.values(element)
				elementValues.forEach((value) => {
					const tableData = document.createElement("td")
					tableData.innerHTML = value
					tableRow.appendChild(tableData)
				})
				overViewTable.appendChild(tableRow)
		  })
		: (overViewTable.innerText = "List is empty create entry")
})

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

//show detail modal of each application

applicationDetailsButton.addEventListener("click", () => {
	applicationDetailsDialog.showModal()
})

applicationDetailsDialogClose.addEventListener("click", () => {
	applicationDetailsDialog.close()
})

applicationDetailsDialogContent.innerHTML = formElements[1].value
