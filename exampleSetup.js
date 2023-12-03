// (1) Constants and state(app Data)

/* EXAMPLE: */

const TODAY = Date.now()
const LOADING = 0,
	READY = 1,
	ERROR = 2

let state = {}

// (2) functions for working with the data.

/* EXAMPLE:*/

let setLoading = () => (state.view = LOADING)
let setReady = () => (state.view = READY)
let isLoading = () => state.view === LOADING
let isReady = () => state.view === READY

let loadSongs = () =>
	fetch("/api/songs/")
		.then((res) => res.json())
		.then((data) => {
			state.songs = data.songs
			state.view = READY
		})
		.catch(() => (state.view = ERROR))

// (3) DOM node references

let D = document
let $play = D.getElementById("play")
let $stop = D.getElementById("stop")
let $viewLoading = D.getElementById("view-loading")
let $viewReady = D.getElementById("view-ready")
let $$instruments = D.querySelectorAll(".instrument-option")

// (4) DOM update functions

let updateView = () => {
	$viewLoading.classList.toggle("hidden", !isLoading())
	$viewReady.classList.toggle("hidden", !isReady())
	$viewError.classList.toggle("hidden", !isError())
}
let updateSongDetails = (songData, index) => {
	let $song = $$songs[index]
	$song.querySelector(".active").classList.toggle("hidden", !isSelected(index))
	$song.querySelector(".title").textContent = songData.title
	$song.querySelector(".tempo").textContent = songData.tempo + "bpm"
}
let updateSongs = () => state.songs.forEach(updateSongDetails)

// (5) Event handlers - are called from eventlisteners in the event bindings

let onPlay = () => {
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
let onEdit = (scores) => {
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
let onLoadSong = (songId) => {
	onStop()
	loadSong(songId).then(onSongLoaded)
}

// (6) event bindings

$play.onclick = () => onPlay()
$stop.onclick = () => onStop()
$scoreEditor.oninput = (ev) => onEdit(ev.target.value)

// (7) initial state

setReady()
updateView()
