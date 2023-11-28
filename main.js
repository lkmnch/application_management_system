const createButton = document.getElementById("createButton")
const overViewTable = document.getElementById("tbody")
const createApplicationForm = document.getElementById("createApplicationForm")
const formElements = Array.from(
	document.getElementById("createApplicationForm").elements
)
const createApplicationButton = document.getElementById(
	"createApplicationButton"
)
const closeDialogButton = document.getElementById("closeDialogButton")
const addApplicationDialog = document.getElementById("addApplicationDialog")

createButton.addEventListener("click", () => {
	addApplicationDialog.showModal()
})

closeDialogButton.addEventListener("click", () => {
	addApplicationDialog.close()
	createApplicationForm.reset()
})

createApplicationForm.addEventListener("submit", (e) => {
	e.preventDefault()
	const newRow = document.createElement("tr")
	formElements.forEach((element) => {
		if (element.type !== "submit") {
			const tableData = document.createElement("td")
			tableData.innerHTML = element.value
			newRow.appendChild(tableData)
		}
	})
	overViewTable.appendChild(newRow)
	createApplicationForm.reset()
	addApplicationDialog.close()
})
