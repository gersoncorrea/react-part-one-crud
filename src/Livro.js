import InputCustomizado from './componentes/InputCustomizado';
import PubSub from 'pubsub-js';
import TratadoErros from './TratadorErros';
import { Component } from '../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/react';



class FormularioLivro extends Component{
    constructor(){
        super();
        this.state = {titulo:'',preco:'',autorId:''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutorId = this.setAutorId.bind(this);
    }

    enviaForm(evento){
        evento.preventDefault();    
        $.ajax({
          url:'http://localhost:8080/api/autores',
          contentType:'application/json',
          dataType:'json',
          type:'post',
          data: JSON.stringify({titulo:this.state.titulo, preco:this.state.preco, autorId:this.state.autorId}),
          success: function(resposta){
              PubSub.publish('atualiza-lista-autores',novaListagem)
              this.setState({nome:'',email:'',senha:''});        
          }.bind(this),
          error: function(resposta){
            if(resposta.status === 400){
              new TratadorErros().publicErros(resposta.responseJSON)
            }
          },
          beforeSend:function(){
            PubSub.publish("limpa-erros",{})
          }      
        });
      }
    
      setTitulo(evento){
        this.setState({nome:evento.target.value});
      }
    
      setPreco(evento){
        this.setState({email:evento.target.value});
      }  
    
      setAutorId(evento){
        this.setState({senha:evento.target.value});
      }

}


class TabelaLivros extends Component{
    
    render(){
        var livros = this.props.lista.map(function(livro){
            return(
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Preço</th>
                                <th>Autor</th>                                                        
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.lista.map(function(livro){
                                    return(
                                        <tr key={livro.id}>
                                            <td>{livro.titulo}</td>
                                            <td>{livro.preco}</td>
                                            <td>{livro.autor.nome}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
        })
        
    }
}

export default class LivroBox extends Component{
    constructor(){
        super();
        this.state = {lista: []};
    }

    componentDidMount(){  
        $.ajax({
            url:"http://localhost:8080/api/livros",
            dataType: 'json',
            success:function(data){    
              this.setState({lista:data});
            }.bind(this)
          });

          $.ajax({
            url:"http://localhost:8080/api/autores",
            dataType: 'json',
            success:function(data){    
              this.setState({autores:data});
            }.bind(this)
          })


        PubSub.subscribe('atualiza-lista-livros',function(topico,novaListagem){
          this.state({lista:novaLista})
        }).bind(this);
    }

    render(){
        return(
            <div>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <div className="content" id="content">
                    <FormularioLivro autores={this.state.autores}/>
                    <TabelaLivros lista={this.state.lista}/>
                </div>
            </div>
        );
    }

}