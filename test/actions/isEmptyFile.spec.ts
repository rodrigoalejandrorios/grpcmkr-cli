import path from "path"
import { validatorEmptyFile } from "../../utils/validatorEmptyFile"

describe('Proto validator',()=>{
    let filePath: string
    beforeAll(()=>{
        filePath = path.join(process.cwd(),'test/mocks/empty.proto')
    })
    describe('Verify is empty file',()=>{
        it('Func - validatorEmptyFile',()=>{
            const srt = validatorEmptyFile(filePath)
            expect(srt).toBe(false)
        })
    })
})