import React from 'react';

class VideoPlayer extends React.Component{

  constructor() {
    super();
    this.state = {
        data: null,
    };
}

    GetData(list) {
        fetch('https://kodikapi.com/search?token=9f97924b4aae53e816f330c113b08294&with_material_data=true&id='+list, {
          method: 'POST',
        }).then(res => res.json())
          .then(respons => {
            this.setState({ data: respons.results[0]});
            console.log("Video: ", respons.results[0]);
          })
      }

    render(){
      let params = (new URL(document.location)).searchParams; 
        
      if(!this.state.data)
      {
        this.GetData(params.get("id"));
        return <div>Загрузка данных....</div>
      }

        return(
            <div className={"central"} style={{paddingTop: "100px"}}>
                <p className="post-slot-button post-slot-buttonview">{this.state.data.title}</p>
                  {this.state.data.material_data 
                            ?  
                            <img style={{float: "left", padding: "3px"}} src={this.state.data.material_data.poster_url} height="200px"/>
                            :
                            <img style={{float: "left", padding: "3px"}} src={require('../images/noposter.png')} height="200px"/>
                        }
                  {this.state.data.material_data &&
                        <div style={{position: "relative", color: "white"}}>
                            <p>Год: {this.state.data.year}</p>
                            <p>Страна: {!this.state.data.material_data.anime_genres && this.state.data.material_data.countries.map((list) => <p style={{display: "initial"}}>{list} </p>)}</p>
                            <p>Жанры: {!this.state.data.material_data.anime_genres ? this.state.data.material_data.genres.map((list) => <p style={{display: "initial"}}>{list} </p>) : this.state.data.material_data.anime_genres.map((list) => <p style={{display: "initial"}}>{list} </p>)}</p>
                            <p>Продолжительность: {this.state.data.material_data.duration} мин.</p>
                            <br/>
                            <p>{this.state.data.material_data.description && this.state.data.material_data.description}</p>
                            <p style={{position: "absolute", right: "5px", top: 0}}>КиноПоиск: {this.state.data.material_data.kinopoisk_rating}</p>
                            <p style={{position: "absolute", right: "5px", top: "15px"}}>Imdb: {this.state.data.material_data.imdb_rating}</p>
                            <p style={{position: "absolute", right: "5px", top: "30px", color: "green"}}>{this.state.data.quality}</p>
                        </div>
                        }
                        <br/>
                <iframe src={this.state.data.link} width="100%" height="350" frameborder="0" allowfullscreen allow="autoplay *; fullscreen *"></iframe>
            </div>
        );
    };
}

export default VideoPlayer;