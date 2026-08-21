import { expect} from "chai"
import supertest from "supertest"
import app from "../src/app.js" 

const requester = supertest(app)

//describe -> agrupa casos de prueba
//it -> cada caso de prueba
//expect -> assertions / evaluación

describe("Testing funcional del módulo Mocking", () => {

    //Aclaración it separados tema didáctico
    it("Debe responder con un código HTTP 200", async ()=>{
        const response = await requester.get("/api/mocks/mockingorders")

        expect(response.status).to.equal(200)
    })

    it("Debe devolver un objeto como respuesta", async ()=>{

        const response = await requester.get("/api/mocks/mockingorders")

        expect(response.body).to.be.an("object")

    })

    it("Debe contener las propiedades status y payload", async()=>{

        const response = await requester.get("/api/mocks/mockingorders")

        expect(response.body).to.have.property("status")
        expect(response.body).to.have.property("payload")

    })

    it("Payload debe ser un array", async ()=>{
        const response = await requester.get("/api/mocks/mockingorders")

        expect(response.body.payload).to.be.an("array")
    })

    it("Payload no debe estar vacío", async ()=>{
        const response = await requester.get("/api/mocks/mockingorders")

        expect(response.body.payload).to.not.be.empty
    })


    it("Cada orden debe tener store, items y total", async ()=>{
        const response = await requester.get("/api/mocks/mockingorders")
        
        response.body.payload.forEach(order => {
            expect(order).to.have.property("store")
            expect(order).to.have.property("items")
            expect(order).to.have.property("total")
        })


        //Caso para testear a un índice específico dentro de un array
        // const primeraOrden = response.body.payload[0]

        // expect().to.have.property("")
        // expect().to.have.property("")
        // expect().to.have.property("")
    })




















    // it("Debe obtener correctamente los usuarios simulados", async () => {
    //     //Primer paso hacer la peticion al endpoint a probar
    //     const response =  await requester.get("/api/mocks/mockingusers") 

    //     //Analizar respuesta esperada y respuesta real
    //     expect(response.status).to.equal(200)
    // })


})