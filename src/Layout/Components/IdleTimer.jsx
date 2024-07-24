import { useIdleTimer } from "react-idle-timer";
import { useDispatch, useSelector } from "react-redux";
import { logOut, setMessage } from "../../store/slices/profileSlice";
import { useEffect } from "react";
import { resetStore } from "../../store/store";

const IdleTimerComponent = () => {
	const dispatch = useDispatch();

	const token = useSelector((state) => state?.profile?.token);

	const onPresenceChange = (presence) => {
		// Handle state changes in one function
	};

	const onPrompt = () => {
		// Fire a Modal Prompt
		dispatch(setMessage("You Will be Logged out in 5 seconds"));
	};

	const onIdle = () => {
		// Close Modal Prompt
		// Do some idle action like log out your user
		dispatch(logOut({ token }));

		localStorage.setItem("expiryMessage", "Your Session has Expired!");
		// message("Session Expired", true);
	};

	const onActive = (event) => {
		// Close Modal Prompt
		// Do some active action
	};

	const onAction = (event) => {
		localStorage.setItem("lastActiveTime", Date.now());
		// Do something when a user triggers a watched event
	};

	const {
		start,
		reset,
		activate,
		pause,
		resume,
		isIdle,
		isPrompted,
		isLeader,
		isLastActiveTab,
		getTabId,
		getRemainingTime,
		getElapsedTime,
		getLastIdleTime,
		getLastActiveTime,
		getIdleTime,
		getTotalIdleTime,
		getActiveTime,
		getTotalActiveTime,
	} = useIdleTimer({
		onPresenceChange,
		onPrompt,
		onIdle,
		onActive,
		onAction,
		timeout: 1000 * 60 * 30,
		promptBeforeIdle: 0,
		events: ["keydown", "mousewheel", "mousedown", "touchstart", "touchmove"],
		immediateEvents: [],
		debounce: 0,
		throttle: 500,
		eventsThrottle: 200,
		element: document,
		startOnMount: true,
		startManually: false,
		stopOnIdle: false,
		crossTab: true,
		name: "idle-timer",
		syncTimers: 0,
		leaderElection: true,
		// emitOnSelf: true,
	});

	useEffect(() => {
		localStorage.setItem("lastActiveTime", Date.now());
	}, []);

	// You can start the idle timer manually if needed
	// start();

	// You can stop the idle timer manually if needed
	// pause();

	// You can resume the idle timer manually if needed
	// resume();

	// You can reset the idle timer manually if needed
	// reset();

	return null; // or any component you want to render
};

export default IdleTimerComponent;
