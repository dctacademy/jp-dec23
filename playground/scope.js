function createUrl(role) {
    let url 
    if(role == 'candidate') {
         url = '/api/candiate/profile'
    } else {
         url = '/api/recruiter/profile'
    }
    console.log(url)
}
createUrl('recruiter')