function LandingpageBLcard({icon,uppertext,lowertext}){
    return(
        <div className=" p-2 ">
            <div className="inline rounded-full bg-blue-800">{icon}</div>
            <h3 className="text-left text-black font-bold">{uppertext}</h3>
            <p className="text-left">{lowertext}</p>
        </div>
    );
}
export default LandingpageBLcard;