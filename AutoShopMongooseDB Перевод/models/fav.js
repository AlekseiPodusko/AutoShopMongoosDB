const path = require('path')
const fs = require('fs')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'fav.json'
)

class Fav{
    static async add(auto){
        const fav = await Fav.fetch()

        const idx = fav.autos.findIndex(c=>c.id === auto.id)
        const candidate = fav.autos(idx)

        if(candidate){
            candidate.count++
            fav.autos[idx]=candidate
        }else{
            auto.count = 1
            fav.autos.push(auto)
        }

        fav.price += +auto.price

        return new Promise((resolve,reject)=>{
            fs.writeFile(p,JSON.stringify(fav),err =>{
                if(err){
                    reject(err)
                }else{
                    resolve()
                }
            })
        })
    }
    
    static async remove(id){
        const fav = await Fav.fetch()

        const idx = fav.autos.findIndex(c=> c.id === id)
        const auto = fav.autos[idx]

        if(auto.count ===1){
            fav.autos=fav.autos.filter(c=> c.id !== id)
        }else{
            fav.autos[idx].count--
        }
        fav.price -= auto.price

        return new Promise((resolve,reject)=>{
            fs.writeFile(p,JSON.stringify(fav),err=>{
                if(err){
                    reject(err)
                }else{
                    resolve(err)
                }
            })
        })
    }

    static async fetch(){
        return new Promise((resolve,reject)=>{
            fs.readFile(p,'utf-8',(err,content)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(JSON.parse(content))
                }
            })
        })
    }

}
module.exports=Fav