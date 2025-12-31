function Timer() {
    let [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("Timer is running...");
            setTime((prevTime) => prevTime + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [])
    return (
        <>
        <h1>Time:{time}</h1>
        </>
    );
}
export default Timer;