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
let rowIndex = 0
const addNewApplication = (application) => {
	let formData = new FormData(application)
	//todo --- FormData nochmal anschauen

	console.log(Object.fromEntries(formData))
	const newRow = document.createElement("tr")
	const checkBox = document.createElement("td")
	checkBox.innerHTML = `<input type="checkbox" name=${rowIndex} />&nbsp;`
	newRow.appendChild(checkBox)

	applications = application.map((inputField) => ({
		...inputField,
		[inputField.name]: inputField.value,
	}))
	localStorage.setItem("applications", JSON.stringify(applications))
	applications.forEach((element) => {
		if (Object.keys(element).toString() !== "submit") {
			const tableData = document.createElement("td")
			tableData.innerHTML = Object.values(element)
			newRow.appendChild(tableData)
		}
	})

	overViewTable.appendChild(newRow)
	rowIndex++
}

const updateApplication = () => {}

const deleteApplication = () => {
	localStorage.removeItem("applications")
}

document.addEventListener("DOMContentLoaded", () => {
	//todo add checkbox and checkboxIndex in localStorage
	let tableRow = document.createElement("tr")
	const applicationsData = JSON.parse(localStorage.getItem("applications"))
	console.log(applicationsData)
	if (applicationsData !== null) {
		overViewTable.innerText = ""
		applicationsData.forEach((item) => {
			const tableData = document.createElement("td")
			tableData.innerHTML = Object.values(item)
			tableRow.appendChild(tableData)
		})
		overViewTable.appendChild(tableRow)
	} else {
		overViewTable.innerText = "List is empty create entry"
	}
})

createButton.addEventListener("click", () => {
	addApplicationDialog.showModal()
})

deleteList.addEventListener("click", () => deleteApplication())

closeDialogButton.addEventListener("click", () => {
	addApplicationDialog.close()
	createApplicationForm.reset()
})

createApplicationForm.addEventListener("submit", (e) => {
	e.preventDefault()

	addNewApplication(formElements)

	createApplicationForm.reset()
	addApplicationDialog.close()
})

//show detail modal of each application

applicationDetailsButton.addEventListener("click", () => {
	applicationDetailsDialog.showModal()
})

applicationDetailsDialogClose.addEventListener("click", () => {
	applicationDetailsDialog.close()
})

applicationDetailsDialogContent.innerHTML = formElements[1].value
