/**
 * unit面板
 * @auther 孟辰
 */
import './index.less';
import React from 'react';
import PropTypes from 'prop-types';
import UnitMeta from '@units/meta';
import UnitOgp from '@units/ogp';
import UnitImage from '@units/image';
import UnitButton from '@units/button';
import UnitTitle from '@units/title';
import UnitTextBody from '@units/textbody';
import UnitAudio from '@units/audio';
import UnitVideo from '@units/video';
import UnitCode from '@units/code';
import UnitSwiper from '@units/swiper';
import UnitLine from '@units/line';
import UnitImageGird from '@units/imagegird';
import UnitBottomFloat from '@units/bottomfloat';
import UnitDataSystem from '@units/datasystem';
import UnitNets from '@units/nets';
import UnitCarousel from '@units/carousel';
import UnitRules from '@units/rules';
import UnitQrcode from '@units/qrcode';

import unitAction from '../../../actions';

class UnitMain extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      pageX: null,
      pageY: null,
      dragFlag: false // 设置下是不是在drag状态
    };
  }

  renderUnits(units) {
    // console.log(units);
    return units.map((item, index) => {
      const uid = item.get('uid');
      switch (item.get('type')) {
        case 'META':
          return <UnitMeta key={uid} id={index} data={item} />;
        case 'OGP':
          return <UnitOgp key={uid} id={index} data={item} />;
        case 'TITLE':
          return <UnitTitle key={uid} id={index} data={item} />;
        case 'IMAGE':
          return <UnitImage key={uid} id={index} data={item} />;
        case 'BUTTON':
          return <UnitButton key={uid} id={index} data={item} />;
        case 'TEXTBODY':
          return <UnitTextBody key={uid} id={index} data={item} />;
        case 'AUDIO':
          return <UnitAudio key={uid} id={index} data={item} />;
        case 'VIDEO':
          return <UnitVideo key={uid} id={index} data={item} />;
        case 'CODE':
          return <UnitCode key={uid} id={index} data={item} />;
        case 'SWIPER':
          return <UnitSwiper key={uid} id={index} data={item} />;
        case 'LINE':
          return <UnitLine key={uid} id={index} data={item} />;
        case 'IMAGEGIRD':
          return <UnitImageGird key={uid} id={index} data={item} />;
        case 'BOTTOMFLOAT':
          return <UnitBottomFloat key={uid} id={index} data={item} />;
        case 'DATASYSTEM':
          return <UnitDataSystem key={uid} id={index} data={item} />;
        case 'NETS':
          return <UnitNets key={uid} id={index} data={item} />;
        case 'CAROUSEL':
          return <UnitCarousel key={uid} id={index} data={item} />;
        case 'RULES':
          return <UnitRules key={uid} id={index} data={item} />;
        case 'QRCODE':
          return <UnitQrcode key={uid} id={index} data={item} />;
        default:
          return <div key={uid} id={index}>未知组件</div>
      }
    });
  }

  handleMouseEnter(e) {}

  handleMouseLeave(e) {}

  handleMouseDown(e) {
    if (!this.state.dragFlag && e.target.className.indexOf('move') > -1) {
      this.panel = e.target.offsetParent;
      console.log(e.target);
      console.log(this.panel);
      this.startTop = this.panel.offsetTop;
      this.panel.style.zIndex = 1;
      this.panelTop = parseInt(this.panel.style.top, 10) || 0;
      this.pList = [];
      for (let i = 0; i < this.refs.unitMain.children.length; i++) {
        const unit = this.refs.unitMain.children[i];
        this.pList.push({ top: unit.offsetTop, height: unit.offsetHeight, editable: unit.dataset.editable });
      }
      this.setState({ dragFlag: true, pageX: e.pageX, pageY: e.pageY });
    }
  }

  handleMouseMove(e) {
    const { pageX, pageY, dragFlag } = this.state;
    if (dragFlag === true) {
      const moveEvent = {
        moveX: e.pageX - pageX,
        moveY: e.pageY - pageY
      };
      this.panelTop = this.panelTop + moveEvent.moveY;
      this.panel.style.top = `${this.panelTop}px`;
      this.setState({ pageX: e.pageX, pageY: e.pageY, dragFlag: true });
    } else {
      return false;
    }
  }

  handleMouseUp(e) {
    const { pageX, pageY, dragFlag } = this.state;
    if (dragFlag) {
      e.preventDefault();
      const fid = this.panel.dataset.id;
      const moveEvent = {
        moveX: e.pageX - pageX,
        moveY: e.pageY - pageY
      };
      const y = this.startTop + this.panelTop + moveEvent.moveY;
      let tid = fid;
      for (let i = 0; i < this.pList.length; i++) {
        const p = this.pList[i];
        if (p.editable == 'true' && y > p.top && y < p.top + p.height) {
          tid = i;
          break;
        }
      }
      this.panel.style.zIndex = 'auto';
      this.panel.style.top = '0px';
      this.panel = null;
      this.setState({ dragFlag: false, pageX: null, pageY: null });
      unitAction.moveUnit(fid, tid);
    }
  }

  render() {
    const { unit } = this.props;
    return (
      <div
        id="umain"
        className="unit-main"
        ref="unitMain"
        onMouseEnter={e => this.handleMouseEnter(e)}
        onMouseLeave={e => this.handleMouseLeave(e)}
        onMouseDown={e => this.handleMouseDown(e)}
        onMouseMove={e => this.handleMouseMove(e)}
        onMouseUp={e => this.handleMouseUp(e)}
      >
        {' '}
        {this.renderUnits(unit)}{' '}
      </div>
    );
  }
}

export default UnitMain;
