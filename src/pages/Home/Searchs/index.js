import React, { Component } from 'react'
import { Input } from 'antd';
const { Search } = Input;
// import { search } from '../../../common/API'
export default class Searchs extends Component {
    // constructor(props){
    //     super(props)
    //     //console.log(props)
    // }
    // componentDidMount(){
    //     this.$http.get(search).then(res=>{
    //         console.log(res)
    //     })
    // }
    render() {
        return (
            <div>
                <div className='sou'>
                    <Search
                        placeholder="搜索歌曲，歌单，专辑"
                        onSearch={value => console.log(value)}
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
            </div>
        )
    }
}
