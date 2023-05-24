import axios from "axios";

const request2 = axios.create({
    baseURL: "https://emilyfumo.com"
})

export const AlunoFake = [
    { img: 'https://media.licdn.com/dms/image/D4D03AQH4DmK_z9k6CA/profile-displayphoto-shrink_800_800/0/1665597842820?e=1689206400&v=beta&t=XMTAOt8zpBTUfUWYh49L4HWLYKQx8XZl7w9kVtGFils', nome: 'Matheus Silva' },
    { img: 'https://conteudo.imguol.com.br/c/esporte/1d/2019/11/10/gabriel-barbosa-o-gabigol-atacante-do-flamengo-1573429834379_v2_900x506.jpg', nome: 'Gabriel Barbosa' },
    { img: 'https://media.licdn.com/dms/image/D4D03AQGsAskIRQ4nwQ/profile-displayphoto-shrink_800_800/0/1678794187923?e=1689811200&v=beta&t=tMSnYSTE64CupnrUibR8fm2XrV46SDAoMTvCLV4Ztdw', nome: 'Emilly Melo' },
];