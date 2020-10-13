import React from 'react';
import "antd/dist/antd.css";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './styles/App.css';
import Posts from './components/Posts'
import Left_Bar from './components/Left_Bar';
import Header from './components/Header'
import { Affix, BackTop, Input } from 'antd';
import Films from './components/Films';
import { UpOutlined } from '@ant-design/icons';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import VideoPlayer from './components/ViderPlayer';
import Top from './components/Top';
import Login from './components/Login';
import Profile from './components/Profile';
import Searth from './components/Searth'

const { Search } = Input;

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      BookMarks: [],
      Posts: [],
      SliderPost: [],
      VideoContent: [],
      Recomend: [],
      PostValue: 0,
      VideoValuePage: 0,
      pageSize: 5,
      search: "",
      Type: 0,
    };

    this.GetData = this.GetData.bind(this);
    this.RenderPost = this.RenderPost.bind(this);
    this.Search = this.Search.bind(this);
  }

  componentDidMount() {
    this.GetData(0);
    this.GetSave();
    this.RenderPost(3, 0, 5);
    this.GetSliderData();
    this.GetRecomendData();
  }

  GetData(list) {
    var form = new FormData();
    form.append('list', list);
    fetch('http://site.alwaysdata.net/posts.php', {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        this.setState({ Posts: respons.posts, PostValue: respons.postsvalue});
      })
  }

  GetSliderData() {
    fetch('http://site.alwaysdata.net/headslider.php', {
      method: 'POST',
    }).then(res => res.json())
      .then(respons => {
        this.setState({ SliderPost: respons.posts});
      })
  }

  GetRecomendData() {
    fetch('http://site.alwaysdata.net/recomend.php', {
      method: 'POST',
    }).then(res => res.json())
      .then(respons => {
        this.setState({ Recomend: respons.posts});
      })
  }

  SetSave(title, idvideo) {
    var form = new FormData();
    form.append('title', title);
    form.append('idvideo', idvideo);
    form.append('table', localStorage.getItem("token"));
    fetch('http://site.alwaysdata.net/save.php', {
      method: 'POST',
      body: form,
    })
  }

  GetSave() {
    var form = new FormData();
    form.append('table', localStorage.getItem("token"));
    fetch('http://site.alwaysdata.net/write.php', {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        this.setState({ BookMarks: respons.marks});
        console.log("Save: ", respons.marks);
      })
  }

  RemoveSaveBookMark(id) {
    var form = new FormData();
    form.append('id', id);
    form.append('table', localStorage.getItem("token"));
    fetch('http://site.alwaysdata.net/remove.php', {
      method: 'POST',
      body: form,
    })
  }

  RenderPost(type, Page, pageSize)
  {
    var form = new FormData();
      form.append('type', type);
      form.append('page', Page);
      this.setState({pageSize: pageSize});
      form.append('pagesize', pageSize);

    fetch("http://site.alwaysdata.net/datavideo.php", {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        this.setState({ VideoContent: respons, VideoValuePage: respons.length});
        console.log("Video: ", this.state.VideoContent);
    })

    this.setState({Type: type});
  }

  Search(type, Page, pageSize, result){
    this.setState({pageSize: pageSize, search: result, Type: type});
    var form = new FormData();
      form.append('type', type);
      form.append('page', Page);
      form.append('pagesize', pageSize);
      form.append('result', result);

    fetch("http://site.alwaysdata.net/searth.php", {
      method: 'POST',
      body: form,
    }).then(res => res.json())
      .then(respons => {
        this.setState({ VideoContent: respons, VideoValuePage: respons.length});
        console.log("Searth: ", this.state.VideoContent);
    })
  }

  render() 
  {
    let Content;

    if(this.state.SliderPost[0] == null){this.GetSliderData();}

    switch(this.state.Type)
    {
      default: Content = <Posts Content={this.state.Posts} Value={this.state.PostValue} Func={this.GetData} />; break;
      case "2": Content = <Top />; break
      case "3": Content = <Films Value={this.state.VideoValuePage} Func={this.RenderPost} SetSave={this.SetSave} ContentVideo={this.state.VideoContent.video} type="3"/>; break
      case "4": Content = <Films Value={this.state.VideoValuePage} Func={this.RenderPost} SetSave={this.SetSave} ContentVideo={this.state.VideoContent.video} type="4"/>; break
      case "5": Content = <Films Value={this.state.VideoValuePage} Func={this.RenderPost} SetSave={this.SetSave} ContentVideo={this.state.VideoContent.video} type="5"/>; break
      case "6": Content = <Films Value={this.state.VideoValuePage} Func={this.RenderPost} SetSave={this.SetSave} ContentVideo={this.state.VideoContent.video} type="6"/>; break;
    }

    let profile;

        if(localStorage.getItem("token")){
            profile = <Profile />;
        }else{
            profile = <Login />;
        }

    return (
      <Router>
          <BackTop>
            <div className="BackUp"><UpOutlined /></div>
          </BackTop>

          <div className={"main-conteiner"}>
          
          <div className="header">
              <h3 style={{color: "#FFD700", margin: "5px 50px", fontWeight: 800, fontSize: "24px"}}>Dark Raven</h3>
              <Switch>
                <Route path="/searth">
                  <Search style={{marginTop: "10px"}} allowClear bordered={false} size="small" className="search" placeholder="Поиск видео...." onSearch={value => {this.Search(this.state.Type, 0, this.state.pageSize, value);}} enterButton />
                </Route>
              </Switch>
              {profile}
          </div>

          <Header pageSize={this.state.pageSize} BookMarks={this.state.BookMarks} RemoveSaveBookMark={this.RemoveSaveBookMark}  RenP={this.RenderPost}/>
           
           <OwlCarousel autoplayTimeout={5000} autoplay={true} className="owl-theme" loop margin={20} items={1} dots={false}>
             {this.state.SliderPost.map((items, key) => 
                <div class="item" key={key}>
                  <div className="carusel_item">
                    <div className="carusel_background" style={{backgroundImage: "url(" + items.photo + ")"}}></div>
                    <div className={"carusel_info"}><div><Link to={"/video_player?id="+items.idvideo}><h2>{items.title}</h2></Link><p>{items.discr}</p></div><img src={items.photo} style={{width: "170px"}}/></div>
                  </div>
                </div>
              )}
          </OwlCarousel>

            <div className="option"></div>
          <Left_Bar data={this.state.Recomend}/>
            <Switch>
              <Route exact path="/">
                {Content}
              </Route>
              <Route path="/video_player">
                <VideoPlayer/>
              </Route>
              <Route path="/searth">
                <Searth search={this.state.search} Value={this.state.VideoValuePage} sear={this.Search} SetSave={this.SetSave} ContentVideo={this.state.VideoContent.video} type="7"/>
              </Route>
            </Switch>
              {/* <Footer /> */}
          </div>
      </Router>
    );
  }
}

export default App;