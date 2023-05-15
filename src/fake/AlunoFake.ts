import axios from "axios";

const request2 = axios.create({
    baseURL: "https://emilyfumo.com"
})

export const AlunoFake = [
    { img: 'https://media.licdn.com/dms/image/D4D03AQH4DmK_z9k6CA/profile-displayphoto-shrink_800_800/0/1665597842820?e=1689206400&v=beta&t=XMTAOt8zpBTUfUWYh49L4HWLYKQx8XZl7w9kVtGFils', nome: 'Matheus Silva' },
    { img: 'https://media.licdn.com/dms/image/D4D03AQHHY3cn1OpN0w/profile-displayphoto-shrink_800_800/0/1674139666709?e=1689811200&v=beta&t=HXEgw7fzK_JFr0BdNk80ZLonYLAHnE88uPg9-ikESHk', nome: 'Fabio da Silva' },
    { img: 'https://media.licdn.com/dms/image/D4D03AQGsAskIRQ4nwQ/profile-displayphoto-shrink_800_800/0/1678794187923?e=1689811200&v=beta&t=tMSnYSTE64CupnrUibR8fm2XrV46SDAoMTvCLV4Ztdw', nome: 'Emilly Melo' },
];