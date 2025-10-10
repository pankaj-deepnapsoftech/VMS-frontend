


export const Checkhariqui = (exception,user) => {

    if(exception?.aprove_1?.approver?.toString() === user._id?.toString()){
        return true
    }else if ( exception?.aprove_1?.status === "Approved" && exception?.aprove_2?.approver?.toString() === user._id?.toString()){
        return true
    }else if ( exception?.aprove_1?.status === "Approved" && exception?.aprove_2?.status === "Approved"  && exception?.aprove_3?.approver?.toString() === user._id?.toString()){
        return true
    }

    return false
}