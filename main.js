const createButton = document.getElementById("createButton")
const overViewTable = document.getElementById("tbody")

const createApplicationForm = document.getElementById("createApplicationForm")
const formElements = Array.from(
	document.getElementById("createApplicationForm").elements
)

console.log(formElements)

const createApplicationButton = document.getElementById(
	"createApplicationButon"
)

createApplicationForm.onsubmit = (e) => {
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
}
