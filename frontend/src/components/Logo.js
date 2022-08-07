import React from "react";

function Logo() {
  return (
    <div className="logo" style={{display:"flex",flexDirection:"column",justifyContent:"flex-start", width:"200px", alignItems:"center" }}>
      <img src="https://seeklogo.com/images/H/hospital-clinic-plus-logo-7916383C7A-seeklogo.com.png" style={{height:'75px', width:'75px'}} />
      <p><b>Popular Diagonistic Center</b></p>
    </div>
  );
}

export default Logo;
