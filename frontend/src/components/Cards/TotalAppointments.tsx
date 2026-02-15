import React from "react";
import Button from "../Button/Button";

interface TotalAppointmentProps{
    title:string;
    Appointments:number;

}

const TotalAppointment : React.FC<TotalAppointmentProps> = ({title, Appointments})=>{

    return(
        <div style={styles.TotalAppointment}>
            <h3>{title}</h3>
            <p>{Appointments}</p>
            <Button text="check for appointments"/>
        </div>
    );


};

  const styles = {
        TotalAppointment:{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            width: "250px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            margin: "10px"

        }
    };

export default TotalAppointment;