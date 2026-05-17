function LandingpageLcard({icon,uppertext,lowertext}){
    return(
        <div className="border border-white rounded-lg shadow-sm bg-white p-5 ">
            <div>{icon}</div>
            <h3 className="text-left text-black font-bold">{uppertext}</h3>
            <p className="text-left">{lowertext}</p>
        </div>
    );
}
export default LandingpageLcard;