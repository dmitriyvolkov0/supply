import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserContext from '@contexts/User/UserContext';

import {
  AUTH_PAGE,
  REQUESTS_PAGE,
  ARCHIVE_PAGE,
  SEARCH_PAGE
} from './utils/constants/routes.js';

import AuthPage from './pages/AuthPage/AuthPage.jsx';
import RequestsPage from './pages/RequestsPage/RequestsPage.jsx';
import ArchivePage from './pages/ArchivePage/ArchivePage.jsx';
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import { checkUserAuth } from './services/api.js';

export default function App() {
  const { setUser } = useContext(UserContext);

  useEffect(()=> {
    let token = localStorage.getItem('supplyToken');
    if(token){
      checkUserAuth(token)
        .then(res =>  res && setUser(res))
        .catch(err => alert('Возникла внутренняя ошибка!'));
    }else{
      setUser(false);
    }  
  }, []);
  
  return (
    <>
      <Router>
        <Routes>
          <Route path={AUTH_PAGE} element={<AuthPage setUser={ setUser }/>}/>
          <Route path={REQUESTS_PAGE} element={
            <PrivateRoute navTitle="Заявки">
              <RequestsPage/>
            </PrivateRoute>
          }/>
          <Route path={ARCHIVE_PAGE} element={<ArchivePage/>}/>
          <Route path={SEARCH_PAGE} element={<SearchPage/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>

      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut repellendus, assumenda blanditiis ipsam voluptas, quasi nulla, est dolore animi reprehenderit vitae quae recusandae vel corporis. Voluptatum adipisci, quidem recusandae, sequi expedita provident, neque dignissimos voluptatem distinctio repellendus perspiciatis sint minima aliquam hic reiciendis qui ipsum quisquam quasi accusantium nisi consectetur! Deleniti, maiores dicta? Ut asperiores sed dolore unde voluptatibus temporibus voluptates labore possimus molestias aspernatur. Dolore natus numquam, soluta a voluptas consequatur. Dolorum ratione, alias corporis eos voluptatem autem rem! Quod magni, blanditiis cupiditate aliquid a rerum possimus hic dolores error sunt. Ducimus neque quasi fuga expedita nostrum harum hic soluta quo vitae temporibus qui cum nihil optio autem eligendi atque architecto eius facere, molestiae ea. Tempore fuga quod ipsum sint. Magnam dolorum recusandae doloremque, atque repudiandae vitae minus fugiat totam sunt facilis ut? Nisi iure esse, porro dignissimos unde quibusdam voluptates ab ex sint rerum tempore, reiciendis magnam dolorem. Maiores repellat error magni, soluta accusantium eum nihil perspiciatis eaque quo quidem. Maxime iusto officiis dolorem harum incidunt repellat iure asperiores vero porro ducimus. Fugit quasi quam ipsam quos porro, vel dolor mollitia odio magni accusamus recusandae nobis vero quia animi cupiditate earum. Recusandae provident repellendus enim autem maiores amet placeat, ducimus minima dolore, mollitia quidem at officia libero deleniti culpa quae nihil quas perferendis pariatur? Quaerat sint animi nisi in totam quis maxime nam maiores facilis eos quidem itaque, magni voluptatem mollitia quisquam, voluptates exercitationem ratione cum. Distinctio laboriosam, harum facilis iusto accusamus sint fuga dignissimos tenetur inventore ipsa aliquid cumque esse nisi error veritatis ab! Temporibus, quam. Blanditiis totam nihil commodi distinctio assumenda consequuntur temporibus exercitationem quaerat veritatis! Provident libero omnis assumenda inventore exercitationem error blanditiis cum aspernatur? Eveniet quasi fuga illum ipsum. Repudiandae earum id enim nihil nesciunt, natus, autem excepturi in officia ipsum cum ea rerum obcaecati! Odit voluptatum soluta expedita asperiores eaque consequuntur hic odio accusamus neque quibusdam rem at aut error vero nobis tenetur ea delectus nemo voluptas dolore ratione eveniet incidunt, fugiat ut. Totam maiores deserunt, quas perspiciatis consequuntur quidem dignissimos officia itaque delectus suscipit voluptas tempore possimus nostrum ipsa minima quibusdam ipsam nobis! Earum dolorum nesciunt distinctio voluptatum sed animi molestiae praesentium laudantium porro dignissimos eius odit nisi iste sint velit nobis, quibusdam odio quasi qui. Cupiditate eaque porro dolore omnis? Repellendus deserunt est tempore harum quos nisi obcaecati ea magni ad, aliquam consectetur praesentium libero expedita id aperiam, cum et aut, explicabo iusto aliquid voluptatum error! Rerum quod est, suscipit placeat autem consequatur natus ea numquam laudantium, nisi cumque consectetur voluptatibus commodi, quis nostrum cum sequi minima facilis maxime iure quae aut. Totam expedita ad ullam sint fugit voluptas? Repudiandae soluta, sit voluptatem, ratione similique quo beatae totam facilis molestias odio libero vero qui tenetur sint quos! Cupiditate sint exercitationem corporis, dolores magnam molestiae non quam, possimus aliquid excepturi, earum vero mollitia blanditiis fuga aut quisquam atque dicta modi numquam consequatur suscipit! Illo odio sunt saepe asperiores tenetur corporis dolorum adipisci, officia suscipit eum autem assumenda voluptatibus libero earum. Doloribus necessitatibus voluptates repellat blanditiis itaque quam iste hic vero perspiciatis nihil autem eum praesentium corrupti officiis, facere, quae, voluptatem nulla soluta adipisci nostrum! Numquam, adipisci eum aspernatur nam repudiandae maiores atque facilis laudantium, quis odit temporibus explicabo accusamus esse veritatis ab beatae incidunt doloribus. Voluptatem, est! Ipsum quo reiciendis ad enim. Similique, ut fuga laborum sed suscipit voluptatum perferendis tempora illo nesciunt dolor nobis ad, facere temporibus molestiae architecto dolorem totam in quo sit corporis! Voluptatibus autem exercitationem maxime, facilis ipsum excepturi debitis est. Mollitia aliquam explicabo cum nemo est ab cumque nam optio, consequuntur ipsam corporis ipsum modi dolore perspiciatis iure? Nobis fuga, obcaecati repellendus quae qui et, nam, eius optio fugiat eos facere! Soluta vel est ea pariatur! Aliquid eligendi cum harum quos at nobis. Delectus, exercitationem neque. Quisquam eligendi, ea explicabo ad dolore inventore officiis ipsa, tempora sint omnis, magnam ducimus numquam ipsum ab delectus! Aspernatur nam dolore, molestiae repellat harum quis, amet fugiat aliquid itaque magni ratione perferendis? Voluptates laboriosam ad explicabo placeat rerum veniam optio facere ab et, vitae officia inventore hic aliquid commodi officiis aut, autem repudiandae. Maxime voluptatibus minima commodi doloremque ipsum, dolores ipsa libero expedita consequuntur vitae quibusdam animi numquam facere est error velit modi fuga quos omnis quo natus totam suscipit quod recusandae? Repellendus ut sed accusantium optio doloremque animi hic cumque, rem molestiae vel sapiente cupiditate dolor neque sit consectetur, placeat porro sunt expedita necessitatibus perferendis veniam error! Ut odio reprehenderit laboriosam qui, ipsam iusto dolorem sed placeat minus omnis quae quam sapiente quidem vitae facere veniam earum a quas debitis! Dignissimos velit libero sapiente doloribus reprehenderit rem porro minima et in animi officiis iste consectetur, dicta labore vel. Consequuntur qui repellat sunt cumque a dolorum quaerat odit ipsam. Eos, saepe quibusdam necessitatibus doloremque, consequatur similique laborum, optio veniam error obcaecati iste quos fugiat aperiam sunt libero reprehenderit non odit nemo. Officia voluptates adipisci ea illo assumenda! Accusantium nobis minus unde, blanditiis ullam, earum illum corporis a odio cupiditate consequuntur architecto veritatis dolorum, quam fuga quas nemo. Tenetur aliquam vitae nulla reiciendis quibusdam? Officiis est commodi reiciendis minus sequi suscipit, animi, earum iusto mollitia ipsam distinctio deserunt veritatis maxime tempore possimus? Incidunt adipisci odio animi totam sint. Illum ut facere voluptates, nemo laborum eaque cupiditate voluptate commodi consectetur unde qui repellendus error incidunt nihil modi laudantium ab possimus, odio quae fugiat sed iste ex. At magnam quis amet vitae dolorum non reiciendis quae facilis veritatis quaerat voluptas ipsam vel unde, architecto provident doloremque enim aliquam voluptatibus, sint cumque nobis rem exercitationem quas? Quidem quae vero fugit obcaecati distinctio temporibus soluta placeat maiores amet accusantium eos saepe laborum reprehenderit aperiam aut, qui ipsa hic magnam eligendi quis atque beatae fugiat? Excepturi, aut placeat quos omnis impedit illum totam eaque reprehenderit tenetur nostrum nobis consequatur ipsam accusamus et laudantium minima enim explicabo. Aliquam fugit nihil vel veritatis reiciendis velit earum architecto repellendus dolore blanditiis beatae ex possimus ducimus quia dicta in odio perspiciatis ipsa unde, optio facilis deleniti quaerat. Quas molestiae numquam vel!</p>
    </>
  )
}