import axios from "axios";

const request2 = axios.create({
    baseURL: "https://emilyfumo.com"
})

export const AlunoFake = [
    { img: 'https://media.licdn.com/dms/image/D4D03AQH4DmK_z9k6CA/profile-displayphoto-shrink_800_800/0/1665597842820?e=1689206400&v=beta&t=XMTAOt8zpBTUfUWYh49L4HWLYKQx8XZl7w9kVtGFils', nome: 'Matheus Silva' },
    { img: 'https://i.pinimg.com/originals/ca/d5/40/cad5404b15b80cf7ebcf021ff01a2f63.jpg', nome: 'Giba' },
    { img: 'https://media.licdn.com/dms/image/D4D03AQGsAskIRQ4nwQ/profile-displayphoto-shrink_800_800/0/1678794187923?e=1689811200&v=beta&t=tMSnYSTE64CupnrUibR8fm2XrV46SDAoMTvCLV4Ztdw', nome: 'Emilly Melo' },
];