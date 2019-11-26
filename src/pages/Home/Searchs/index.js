import React, { Component } from 'react'
import { Input,Icon } from 'antd';
import { search } from '../../../common/API'
import Masks from '../../../Search/masks'
const { Search } = Input;
export default class Searchs extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
            flag: false,
            itemlist: []
        }
    }
    search(value) {
        console.log(value)
        this.$http.get(search, {params: {
            keyword: value
        }}).then(res =>{
            console.log(res)
            // 打开flag
            this.setState({
                flag: true,
                itemlist: res.data.data.song.itemlist
            })
        })
    }
    render() {
        return (
            <div className='soubox'>
                <div className='sou'>
                    <Search
                        placeholder="搜索歌曲，歌单，专辑"
                        onSearch={value =>this.search(value)}
                        style={{ width: 260 }}
                    />
                   <span>取消</span>               
                </div>
                <div className='hotsou'>
                    <p className='hsp'>热门搜索</p>
                    <div className='na'>
                        <p><span>乐队的夏天</span><span>我和我的祖国</span><span>光</span></p>
                        <p><span>爱的飞行日记</span><span>感谢你曾来过</span><span>山楂树之念</span></p>
                        <p><span>我最亲爱的</span><span>芒种</span></p>

                    </div>
                </div>
                {
                    this.state.flag ? <Masks list={this.state.itemlist}/> : ""
                }
            </div>
        )
    }
}
