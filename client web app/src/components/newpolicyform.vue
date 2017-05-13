<template>
  <div
  <div class="newpolicyform" >
  

    <div class="container-fluid">
<!--     <pre>{{$data}}</pre> -->
  <div class="row">
   <div >
    <form method="post">
    <h1 class="page-header">New Policy Submission Form</h1>
     <div class="panel panel-default">
     <div class="panel-heading"></div>
     <div class="panel-body">
     <div class="form-group ">
     <div class="btn-group" data-toggle="buttons" v-model="policyarea">
  <label class="btn btn-primary active">
    <input type="radio" name="options" id="option1" autocomplete="off" checked>State
  </label>
  <label class="btn btn-primary">
    <input type="radio" name="options" id="option2" autocomplete="off"> County
  </label>

</div>
<br><br>
     <div class="form-group col-sm-6">
      <label class="control-label requiredField" for="policystate">
       State:
      </label>
      <input class="form-control" id="policystate" name="policystate" type="text" v-model="policystate"/>
     </div>
      <div class="form-group col-sm-6">
      <label class="control-label requiredField" for="policycounty">
       County:
      </label>
      <input class="form-control" id="policycounty" name="policycounty" type="text" v-model="policycounty"/>
     </div>
      <label class="control-label requiredField" for="domain">
       Domain
       <span class="asteriskField">
        *
       </span>
      </label>
      <select class="select form-control" id="domain" name="domain" v-model="selecteddomain">
       <option v-for="option in domainoptions" v-bind:value="option.value">
        {{option.value}}
       </option>
      </select>
     </div>
     <div class="form-group ">
      <label class="control-label requiredField" for="policyduration">
       Policy Duration (Approx Duration in Months)
       <span class="asteriskField">
        *
       </span>
      </label>
      <input class="form-control" id="policyduration" name="policyduration" type="text" v-model="policyduration"/>
     </div>
     <div class="form-group ">
      <label class="control-label requiredField" for="policybudget">
       Policy Budget(in $)
       <span class="asteriskField">
        *
       </span>
      </label>
      <input class="form-control" id="policybudget" name="policybudget" type="text"v-model="policybudget"/>
     </div>
     <div class="form-group ">
      <label class="control-label requiredField" for="policyname">
       Policy Name:
       <span class="asteriskField">
        *
       </span>
      </label>
      <input class="form-control" id="policyname" name="policyname" type="text" v-model="policyname"/>
     </div>
     <div class="form-group ">
      <label class="control-label requiredField" for="policydiscription">
       Policy Discription
       <span class="asteriskField">
        *
       </span>
      </label>
      <textarea class="form-control" cols="40" id="policydescription" name="policydescription" rows="10"v-model="policydescription"></textarea>
     </div>
     <div class="form-group">
     <div>
       <button class="btn btn-primary " name="submit" type="submit" v-on:click.prevent=submitPolicy()>
        Submit
       </button>
      </div>
     </div>
     </div> 
     </div>
    </form>
   </div>
  </div>
 </div>
 <div v-if="displayResult==true">
 <pre >create or replace trigger policy_trigger
before insert on policy
for each row

DECLARE 

l NUMBER;
approveapproved varchar2(20) :='Approved';
unapproveapproved varchar2(20) :='Not Approved';

begin

if :new.policy_domain = 'Education' then

    select (:new.policy_budget/Less_school_diploma) into l from education where year = 1980 and state = :new.policy_state and county = :new.policy_county;    
    if (l > 1000) then
        :new.policy_approved := approveapproved; 


    else

   :new.policy_approved := unapproveapproved;

    end if;
    end if;

if :new.policy_domain = 'Employment' then
select (:new.policy_budget/employed ) into l from employment where year =  2007 and state = :new.policy_state and county = :new.policy_county;            
if (l > 100) then
        :new.policy_approved := approveapproved;

         else 
    :new.policy_approved := unapproveapproved;
    end if;
    end if;


    if :new.policy_domain = 'Poverty' then
select (:new.policy_budget/births ) into l from population where year =  2011 and state = :new.policy_state and county =  :new.policy_county; 
if (l > 100) then
       :new.policy_approved := approveapproved;
         else 
    :new.policy_approved := unapproveapproved;
    end if;
    end if;

    if :new.policy_domain = 'Population' then
select (:new.policy_budget/adults) into l from Poverty where state = :new.policy_state and county = :new.policy_county ; 
if (l > 100) then
       :new.policy_approved := approveapproved;
         else 
   :new.policy_approved := unapproveapproved;
    end if;
   end if;

end;
-----------------------------------------------------------------------------------------------------------------------------                        
create or replace package policy_pkg is
procedure insert_policy(
       ppolicy_state IN policy.policy_state%TYPE,
     ppolicy_county IN policy.policy_county%TYPE,
     ppolicy_domain IN policy.policy_domain%TYPE,
     ppolicy_duration IN policy.policy_duration%TYPE,
     ppolicy_budget IN policy.policy_budget%TYPE,
       ppolicy_name IN policy.policy_name%TYPE,
     ppolicy_description IN policy.policy_description%TYPE);
end;                                                                                                                                                                                                                                                                                                   create or replace package body policy_pkg is

PROCEDURE insert_policy(
       ppolicy_state IN policy.policy_state%TYPE,
     ppolicy_county IN policy.policy_county%TYPE,
     ppolicy_domain IN policy.policy_domain%TYPE,
     ppolicy_duration IN policy.policy_duration%TYPE,
     ppolicy_budget IN policy.policy_budget%TYPE,
       ppolicy_name IN policy.policy_name%TYPE,
     ppolicy_description IN policy.policy_description%TYPE)
       
IS
lastPolicyId policy.policy_domain%TYPE;
BEGIN


  SELECT COUNT(*) 
    INTO lastPolicyId 
    FROM policy;

  INSERT INTO policy VALUES (lastPolicyId+1, ppolicy_state, ppolicy_county, ppolicy_domain,ppolicy_duration, ppolicy_budget,ppolicy_name,ppolicy_description,
            'None');

  COMMIT;

END;

END policy_pkg;</pre>
 </div>
  </div>


</template>


<script>
export default {
  name: 'header',
  data() {
    return {
      policystate:'',
      policycounty:'',
      policyname: '',
      policydescription:'',
      policyduration: 0,
      policybudget: 0,
      selecteddomain:'',
      displayResult: false,
      domainoptions:[
                    {
                      text:"Education",
                      value:"Education"
                    },
                    {
                      text:"Population",
                      value:"Population"
                    },
                    {
                      text:"Employment",
                      value:"Employment"
                    },
                    {
                      text:"Poverty",
                      value:"Poverty"
                    }
      ]

    };
  },
  methods: {
    submitPolicy: function () {
      // send a post request to Form POST URL
      let url="http://localhost:5000/policy";
      let params={
        type: "submit",
        policystate: this.policystate,
        policycounty: this.policycounty,
        policyname: this.policyname,
        policydescription: this.policydescription,
        policyduration: this.policyduration,
        policybudget: this.policybudget,
        selecteddomain: this.selecteddomain

      };
      console.log(params);
      this.$http.post(url,{body: params}).then((response) => {
          // get body data
          alert("Policy Submitted Successfully!");
          console.log("OUTPUT:");
          console.log(response.data);

        }).then(()=>{
          this.displayResult=true;
        }).catch((e)=>{
          console.log(e);})
    } 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
