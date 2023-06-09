import { database } from "@/services/firebase"
import { FormEvent, useEffect, useState, ChangeEvent } from "react"
import firebase from 'firebase/app'; // Importe o módulo 'firebase/app'
import 'firebase/storage'; // Importe o módulo 'firebase/storage'
import { Container } from "./style";

type product ={
  chave: string,
  nome: string,
  email: string,
  telefone: string,
  observacoes: string,
  foto: string 
}

export default function NewProduct() {

  const [ nome,setNome] = useState('')
  const [ email,setEmail] = useState('')
  const [ telefone,setTelefone] = useState('')
  const [ observacoes,setObservacoes] = useState('')

  const [products, setproducts] = useState<product[]>()

  const [busca, setBusca] = useState<product[]>()

  const [estaBuscando, setEstaBuscando] = useState(false)

  const [chave, setChave] = useState('')

  const [atualizando, setAtualizando] = useState(false)

  const [fotoArquivo, setFotoArquivo] = useState<File | null>(null);

  useEffect(() =>{
    const Refproducts = database.ref('products')

    Refproducts.on('value', (resultado:any) =>{
      const resultadoproducts = Object.entries<product>(resultado.val() ?? {}).map(([chave,valor]) =>{
        return {
          'chave': chave,
          'nome': valor.nome,
          'email': valor.email,
          'telefone': valor.telefone,
          'observacoes': valor.observacoes,
          'foto': valor.foto
        }
      })
      setproducts(resultadoproducts)
    })
  },[])

  
  function gravar(event: FormEvent) {
    event.preventDefault();
  
    if (fotoArquivo) {
      const storageRef: firebase.storage.Reference = firebase.storage().ref();
  
      const nomeFoto = Date.now().toString();
      const fotoRef = storageRef.child(`${nomeFoto}.jpg`);
      fotoRef.put(fotoArquivo).then(() => {
        fotoRef.getDownloadURL().then((url: any) => {
          const ref = database.ref('products');
  
          const dados = {
            nome,
            email,
            telefone,
            observacoes,
            foto: url
          };
  
          ref.push(dados);
          setNome('');
          setEmail('');
          setTelefone('');
          setObservacoes('');
        });
      });
    }
  }

  function handleFotoChange(event: ChangeEvent<HTMLInputElement>) {
    const arquivo = event.target.files?.[0] || null;
    setFotoArquivo(arquivo);
  }

  function buscar(event: ChangeEvent<HTMLInputElement>){
    const palavra = event.target.value
    if(palavra.length > 0){
      setEstaBuscando(true)
      const dados = new Array
  
      products?.map(product => {
        const regra = new RegExp(event.target.value, "gi")
        if(regra.test(product.nome)){
          dados.push(product)
        }
      })
      setBusca(dados)
    }else{setEstaBuscando(false)}
  }


  function editarDados(product: product){
    setAtualizando(true)
    setChave(product.chave)
    setNome(product.nome)
    setEmail(product.email)
    setTelefone(product.telefone)
    setObservacoes(product.observacoes)
  }

  function atualizarproduct(){
    const ref= database.ref('products/')

    const dados = {
      'nome': nome,
      'email': email,
      'telefone': telefone,
      'observacoes': observacoes
    }

    ref.child(chave).update(dados)

    setNome('')
    setEmail('')
    setTelefone('')
    setObservacoes('')

    setAtualizando(false)
  }

  function deletar(ref:string){
    const referencia = database.ref(`products/${ref}`).remove()
  }

  return (
    <Container>
      <main className="container">
        <form action="" onSubmit={gravar}>
          <input type="text" value={nome} placeholder='Nome' onChange={event => setNome(event.target.value)} />
          <input type="email" value={email} placeholder='Email' onChange={event => setEmail(event.target.value)} />
          <input type="tel" value={telefone} placeholder='telefone' onChange={event => setTelefone(event.target.value)} />
          <textarea placeholder='Observações' value={observacoes} onChange={event => setObservacoes(event.target.value)}></textarea>
          <input type="file" onChange={handleFotoChange} />
          { atualizando ?
            <button type="button" onClick={atualizarproduct}>atualizar</button> :
            <button type="button" onClick={gravar}>Salvar</button>
          }
        </form>
        <div className="caixaproducts">
          <input type="text" onChange={buscar} placeholder='buscar' />
          {estaBuscando ? 
              busca?.map(product => {
                return(
                    <div key={product.chave} className="caixaindividual">
                      <div className="boxtitulo">
                        <p className="nometitulo">{product.nome}</p>
                        <div>
                        <a onClick={() => editarDados(product)} >editar</a>
                        <a onClick={() => deletar(product.chave)} >excluir</a>
                      </div>
                    </div>
                    <div className="dados">
                      <img src={product.foto} alt="Foto do product" /> {/* Adicione esta linha */}
                      <p>{product.email}</p>
                      <p>{product.telefone}</p>
                      <p>{product.observacoes}</p>
                    </div>
                    </div>
                      )
                }): products?.map(product => {
              return(
              <div key={product.chave} className="caixaindividual">
                <div className="boxtitulo">
                  <p className="nometitulo">{product.nome}</p>
                  <div>
                    <a onClick={() => editarDados(product)}>editar</a>
                    <a onClick={() => deletar(product.chave)}>excluir</a>
                  </div>
                </div>
                <div className="dados">
                  <img src={product.foto} alt="Foto do product" /> {/* Adicione esta linha */}
                  <p>{product.email}</p>
                  <p>{product.telefone}</p>
                  <p>{product.observacoes}</p>
                </div>
              </div>
              )
          })
        }
        </div>
      </main>
    </Container>
  )
}