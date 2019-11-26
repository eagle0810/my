import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import { list } from '../../common/API'
//import BScroll from 'better-scroll'
export default class TopList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            title: '',
            dat: '',
            tim: '',
            //pullup:"上拉加载",
        }
    }
    componentDidMount() {
        let id = this.props.location.state.id
        this.$http.get(list, { params: { id } }).then(res => {
            // console.log(res)
            this.setState({
                list: res.data.data.songList,
                title: res.data.data.topInfo.listName,
                dat: res.data.data.totalSongNum,
                tim: res.data.data.updateTime
            }
                // ,()=>{
                //        // better-scroll的前提条件
                //     // 1. 实例化的时候，第一个参数传的是需要做回弹滚动的元素(el)
                //     // 2. el有且仅有一个子元素(son)
                //     // 3. el高度固定，overflow:hidden
                //     // 4. son的高度必须大于el的高度
                //     let bs = new BScroll('.topList', {
                //         probeType: 2
                //     })
                //     bs.on('scroll', () => {
                //         // console.log(bs.y) // 当前滚动的距离
                //         console.log(bs.maxScrollY) // 当前可以滚动的最大距离
                //         if (bs.y < bs.maxScrollY) {
                //             console.log('123')
                //             this.setState({
                //                 pullup: "释放加载"
                //             })
                //         }
                //     })
                // }
            )

        })
    }
    goplay(mid, songid) {
        console.log(this)
        this.props.history.push({
            pathname: '/play', state: {
                mid, songid
            }
        })
    }
    render() {
        const list = this.state.list.map((item, index) => {
            return (
                <li className='li' key={index} onClick={this.goplay.bind(this, item.songMid, item.songId)}>
                    <span>{index + 1}</span>
                    <div className='box'>
                        <p style={{ color: '#000' }}>{item.songName}</p>
                        {/* <p style={{ color: '#ccc' }}>{item.singer[0].singerName}</p> */}

                        <p style={{ color: '#ccc' }}>

                            {
                                item.singer.map((v, i) => {
                                    return <span key={i}> {v.singerName}</span>
                                })
                            }
                        </p>


                    </div>
                    <div className='ic'>
                        <Icon type="vertical-align-bottom" />
                    </div>
                </li>
            )
        })
        return (
            <div className='list'>
                <div className='bos'>
                    <h1>{this.state.title}</h1>
                    <h2>巅峰榜流行指数第{this.state.dat}天</h2>
                    <p>更新时间：{this.state.tim}</p>
                    {/* <button className='btn'><Icon type="caret-right" className='con' /></button> */}
                    <Button type="primary" shape="round" className='btn'>
                        <Icon type="caret-right" className='con' />
                    </Button>
                </div>
                <ul>
                    {/* <li className='li'>
                      <span>1</span>
                      <div className='box'>
                          <p style={{color:'#000'}}>像极了</p>
                          <p style={{color:'#ccc'}}>肖战</p>
                      </div>
                      <div className='ic'>
                      <Icon type="vertical-align-bottom" />
                      </div>
                  </li>
                    */}
                    <p>排行榜  共{this.state.dat}首</p>
                    {

                        list
                    }
                </ul>
            </div>
        )
    }
}
