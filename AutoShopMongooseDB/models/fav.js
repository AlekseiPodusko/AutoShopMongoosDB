const path = require('path')
const fs = require('fs')
const { rejects } = require('assert')
const { errorMonitor } = require('stream')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'fav.json'
)

class Fav{
    static async add(auto){
        const fav = await Fav.fetch()

        const idx = fav.auto.findIndex(c=>c.id === auto.id)
        const candidate = fav.auto(idx)

        if(candidate){
            candidate.count++
            fav.auto[idx]=candidate
        }else{
            auto.count = 1
            fav.auto.push(auto)
        }

        fav.price += +auto.price

        return new Promise((resolve,rejects)=>{
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

        const idx = fav.auto.findIndex(c=> c.id === id)
        const auto = fav.auto[idx]

        if(auto.count ===1){
            fav.auto=fav.auto.filter(c=> c.id !== id)
        }else{
            fav.auto[idx].count--
        }
        fav.price -= auto.price

        return new Promise((resolve,rejects)=>{
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
        return new Promise((resolve,rejects)=>{
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