import React, { useState } from 'react';
import { Table, Tag, Space } from 'antd';
import {
    BrowserRouter as Router,
    Link,
    Redirect 
  } from "react-router-dom";

const { Column } = Table;

class Top extends React.Component {

    constructor() {
        super();
        this.state = {
            TopElements: [],
        };
    }
    componentDidMount() {
        this.GetTop();
    }

    GetTop() {
        fetch('https://kodikapi.com/list?token=9f97924b4aae53e816f330c113b08294&with_material_data=true&translation_type=voice&year=2020&sort=kinopoisk_rating&limit=50', {
          method: 'POST',
        }).then(res => res.json())
          .then(respons => {
            respons.results.map(result => {
                this.setState(state => {
                    return{
                        TopElements: [...state.TopElements, {poster: result.material_data ? <img src={result.material_data.poster_url} height="100px"/> : <img src={require('../images/noposter.png')} height="100px"/>, title: <Link to={"/video_player?id="+result.id}>{result.title}</Link>, link: result.link, year: result.year, quality: result.quality, genres: result.material_data ? result.material_data.genres : null, kinopoisk_rating: result.material_data ? result.material_data.kinopoisk_rating : <p>Без оценки</p>}],
                    }})
            })
            console.log("Top: ", this.state.TopElements);
            console.log("Full: ", respons);
          })
      }

    render() {

        return (
            <div className="central">  
                <Table dataSource={this.state.TopElements} style={{clear: "none"}}>
                <Column
                    title="Постер"
                    dataIndex="poster"
                    key="poster"
                />
                <Column
                    title="Название"
                    dataIndex="title"
                    key="title"
                />
                <Column
                    title="Год"
                    dataIndex="year"
                    key="year"
                />
                <Column
                    title="Качество"
                    dataIndex="quality"
                    key="quality"
                />
                <Column
                    title="Жанры"
                    dataIndex="genres"
                    key="genres"
                    render={genres => (
                        <>
                          {genres != null ? genres.map(tag => (
                            <Tag color="blue" key={tag}>
                              {tag}
                            </Tag>
                          ))
                        :
                        <p>Без распределений по жанрам</p>}
                        </>
                      )}
                />
                <Column
                    title="Рейтинг"
                    dataIndex="kinopoisk_rating"
                    key="kinopoisk_rating"
                />
                </Table>
            </div>
        );
    }
}

export default Top;