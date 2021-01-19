import React from 'react';
import axios from 'axios';
import './CardComponent.css';
import UserComponent from '../Component/UserComponent';


class CardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          users: [],
          location: [],
          search: '',
          userSearch: [],
          selectedCountryOption: null,
          dropDown: null,
          isHidden: true,
          switchOn: true,
          currentPage: 1,
          usersPerPage: 12,
          upperPageBound: 3,
          lowerPageBound: 0,
          isPrevBtnActive: 'disabled',
          isNextBtnActive: '',
          pageBound: 3,
        };
      }

      componentDidMount() {
        this.fetchUsers();
      }

    fetchUsers = async () =>{
      const response = await axios.get('https://randomuser.me/api/?page=6&results=100&seed=123')
      const users = response.data.results;
      this.setState({users})
    }


    onSearchSubmit=(event)=> {
      event.preventDefault();

      //  const {users} = this.state;
      //   const result = users.filter((user) =>
      //   user.name.first.toLowerCase().includes(this.state.search.toLowerCase())
      //   )

      // const final = result;
      //  let i = 0;
      //  while(i < final.length){
      //    console.log(final[i], 'final');
      //    i+= 1;
      //  }
      //  console.log(final, 'final search')
    };

    handleOptionChange = selectedCountryOption => {
      this.setState({ selectedCountryOption });
      console.log(`Option selected:`, selectedCountryOption);
    };

handleClick =(event)=> {
  let userid = Number(event.target.id);
  this.setState({
    currentPage: userid
  });
   this.setPrevAndNextBtnClass(userid);
}
setPrevAndNextBtnClass(userid) {
  let totalPage = Math.ceil(this.state.users.length / this.state.usersPerPage);
  this.setState({isNextBtnActive: 'disabled'});
  this.setState({isPrevBtnActive: 'disabled'});
  if(totalPage === userid && totalPage > 1){
      this.setState({isPrevBtnActive: ''});
  }
  else if(userid === 1 && totalPage > 1){
      this.setState({isNextBtnActive: ''});
  }
  else if(totalPage > 1){
      this.setState({isNextBtnActive: ''});
      this.setState({isPrevBtnActive: ''});
  }
}
btnPrevClick = () => {
  if((this.state.currentPage -1)%this.state.pageBound === 0 ){
      this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
      this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
  }
  let userid = this.state.currentPage - 1;
  this.setState({ currentPage : userid});
  this.setPrevAndNextBtnClass(userid);
}
btnNextClick =() => {
  if((this.state.currentPage +1) > this.state.upperPageBound ){
      this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
      this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
  }
  let userid = this.state.currentPage + 1;
  this.setState({ currentPage : userid});
  this.setPrevAndNextBtnClass(userid);
}

handleToggleCardView =()=>{
  this.setState({isHidden: !this.state.isHidden})
}

handleSwitch =()=> {
  this.setState({switchOn: !this.state.switchOn})
}

// handleGenderBtn =()=> {
//   const {users} = this.state;
//   users.filter((searchRes) =>
//             searchRes.name.first.toLowerCase().includes(this.state.search.toLowerCase()) || searchRes.name.last.toLowerCase().includes(this.state.search.toLowerCase())
//             )
// }

handleDownload = async(event)=>{
  await axios.get('https://randomuser.me/api/?results=50&format=csv&dl')
};



    render(){
        const { users, currentPage, usersPerPage, isPrevBtnActive,isNextBtnActive } = this.state;
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
        // const user = currentUsers.map((user, i) => {
        //   return(
        //     <div key={i}
        //     >
        //       <UserComponent name={user.name.title + ' ' + user.name.first + ' ' + user.name.last} 
        //         image={user.picture.medium} address={user.location.street.number + ' ' + user.location.street.name + ', ' + user.location.city + ', ' + user.location.state} 
        //         email={user.email} phone={user.phone}
                
        //          photo={user.picture.large} username={user.name.title + ' ' + user.name.first + ' ' + user.name.last} old={user.dob.age} 
        //          home={user.location.street.number + ' ' + user.location.street.name + ', ' + user.location.city + ', ' + user.location.state}
        //          eAddress={user.email} created={user.registered.date} phoneNo={user.phone} cellNo={user.cell}
        //       />
        //  </div>
        //  )
        // });
      
        const searchedUsers = users.filter((searchRes) =>
            searchRes.name.first.toLowerCase().includes(this.state.search.toLowerCase()) || searchRes.name.last.toLowerCase().includes(this.state.search.toLowerCase())
            )
        // const genderSearch = searchedUsers.filter()

        const filteredUsers = searchedUsers.map((filteredUser, i) => {
              return(
                  <div key={i}>
                      <UserComponent name={filteredUser.name.title + ' ' + filteredUser.name.first + ' ' + filteredUser.name.last} 
                      image={filteredUser.picture.medium} address={filteredUser.location.street.number + ' ' + filteredUser.location.street.name + ', ' + filteredUser.location.city + ', ' + filteredUser.location.state} 
                      email={filteredUser.email} phone={filteredUser.phone}

                      photo={filteredUser.picture.large} username={filteredUser.name.title + ' ' + filteredUser.name.first + ' ' + filteredUser.name.last} old={filteredUser.dob.age} home={filteredUser.location.street.number + ' ' + filteredUser.location.street.name + ', ' + filteredUser.location.city + ', ' + filteredUser.location.state}
                      eAddress={filteredUser.email} created={filteredUser.registered.date} phoneNo={filteredUser.phone} cellNo={filteredUser.cell}
                      />
                  </div>
              )
          })

              // const searched = searchedUsers.filter((selectedCountry) => 
              // selectedCountry.location.country.toLowerCase().includes(this.state.dropDown.toLowerCase()) )
              
              // searched.map((selected, i) => {
              //   return(
              //     <div key={i}>
              //             <UserComponent name={selected.name.title + ' ' + selected.name.first + ' ' + selected.name.last} 
              //             image={selected.picture.medium} address={selected.location.street.number + ' ' + selected.location.street.name + ', ' + selected.location.city + ', ' + selected.location.state} 
              //             email={selected.email} phone={selected.phone}
    
              //             photo={selected.picture.large} username={selected.name.title + ' ' + selected.name.first + ' ' + selected.name.last} old={selected.dob.age} home={selected.location.street.number + ' ' + selected.location.street.name + ', ' + selected.location.city + ', ' + selected.location.state}
              //             eAddress={selected.email} created={selected.registered.date} phoneNo={selected.phone} cellNo={selected.cell}
              //             />
              //         </div>
              //   ); 
              // })
            
        

      
        
       const country = currentUsers.map((user, i) => {
         return(
            <option key={i}>
                {user.location.country}
            </option>
         )
       })


        let renderPrevBtn = null;
         if(isPrevBtnActive === 'disabled') {
             renderPrevBtn = <button id="btnPrev" className="prev">
                <i class="black angle left  icon" />
             </button>
         }
         else{
            renderPrevBtn = <button id="btnPrev" onClick={this.btnPrevClick} className="prev">
              <i class="left angle left  icon" />
            </button>
         }

        let renderNextBtn = null;
         if(isNextBtnActive === 'disabled') {
             renderNextBtn = <button id="btnNext" className="next">
               <i class="white angle right icon" />
             </button>
         }
         else{
          renderNextBtn = <button  id="btnNext" onClick={this.btnNextClick} className="next">
                <i class="white angle right  icon" />    
            </button>
         }



        return (
            <div className="App">
              <div className="Onboarding">
            <div className="container">
                <div className="welcome-name">Hello, User</div>
                    {/* <p id="name">Hello, Emerald</p> */}
                <div className="welcome-text">Welcome to your dashboard, kindly sort through the user base</div>
                <form onSubmit={this.onSearchSubmit}>
                    <input className="search" type="text" onChange={(e) => this.setState({search: e.target.value})} placeholder="Find a user" />
                  </form>

                <div className="show-users">Show Users</div>
                <div className="gender-section">
                    <div className="gender-container">
                        <button  className="gender">
                        <i  class="white users big icon" />
                        </button>
                        <p>All Users</p>
                    </div>
                    <div className="gender-container">
                        <button className="gender">
                            <i  class="white male big icon" />
                        </button>
                        <p>Male Users</p>
                    </div>
                    <div className="gender-container">
                        <button className="gender">
                        <i  class="white female big icon" />
                        </button>
                        <p>Female Users</p>
                    </div>
                </div>
            </div>
        </div>
                <div className="CardComponent">
                  <div className="header">All Users</div>
                  <div className="filter">Filter By</div>
                  <div className="search-container">
                    <form onSubmit={this.onSearchSubmit}>
                      <input className="search-bar" type="text"  onChange={(e) => this.setState({search: e.target.value})} placeholder="Find in list" />
                    </form>
                    <select  className="country"
                        onChange={(e) => this.setState({dropDown: e.target.value})}
                    >
                      <option>country</option>
                        {country}
                    </select>
                    <div className="switch-container">
                      <div  className={`${this.state.switchOn ? "switch" : "switch-one"}`}>
                        <div onClick={this.handleSwitch} className="inner-switch"></div>
                      </div>
                      <div className="switch-country">Show Country</div>
                    </div>
                  </div>
                    <div className="accordion">
                      {/* {user} */}
                      {filteredUsers}
                    </div>
                    <div className="footer-section">
                      <button className="download" onClick={this.handleDownload}>Download Results</button>
                      <div className="pagination">
                        {renderPrevBtn}
                        {renderNextBtn}
                      </div>
                    </div>
              </div>
            </div>
        );
    }
}
export default CardComponent;