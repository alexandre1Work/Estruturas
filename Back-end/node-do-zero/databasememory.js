import { randomUUID } from "crypto";

export class DataBaseMemory{
    #videos = new Map()

    // SET - método utilizado para definir valores de propriedades em objetos ou variáveis.
    // PUT - método HTTP empregado para atualizar ou substituir recursos existentes no servidor

    list(search) {
        return Array.from(this.#videos.entries())
            .map((videoArray) => {
                const id = videoArray[0]
                const data = videoArray[1]

                return {
                    id,
                    ...data,
                }
            })
            .filter(video => {
                if (search) {
                    return video.title.includes(search)
                }
                
                return true
            })
        
    }
    
    create(video) {
        const videoId = randomUUID()

        this.#videos.set(videoId, video)
    }

    update(id, video) {
        this.#videos.set(id, video)
    }

    delete(id) {
        this.#videos.delete(id)
    }


}
