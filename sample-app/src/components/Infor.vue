<template>
<div>
	
	<v-card height="900px">
		<v-app-bar
		color="indigo lighten-1"
		>
		<h3 class="white--text">Information</h3>
		</v-app-bar>
		
		<p></p>
		<div  class="top" style="text-align:left">
		      
		      <el-button type="success" size="small" @click="addRow(users)" class="addbtn">New Item</el-button>
		      <el-button type="primary" size="small" @click="handleCopy1(currentRow)" class="copybtn">Copy</el-button>
		      
		    </div>
		<div>
			
		      <el-table :data="users" highlight-current-row v-loading="listLoading" @current-change="handleCurrentChange" style="width: 100%;">
		          <!--
				  <el-table-column type="selection" width="60">
				  </el-table-column>
				  -->
		          <el-table-column type="index" width="60">
		          </el-table-column>
		          <el-table-column prop="name"  label="Name" width="120" >
		          </el-table-column>
		          <el-table-column prop="Gender" label="Gender" width="100" sortable>
		          </el-table-column>
		          <el-table-column prop="Tel" label="Tel" min-width="120" >
		          </el-table-column>
		          <el-table-column prop="data" label="Birthday Date" min-width="120" sortable>
		          </el-table-column>
		          <el-table-column prop="desc" label="Interests" min-width="180" >
		          </el-table-column>
		          <el-table-column label="Actions" width="300">
		            <template slot-scope="scope">
		              
		              <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)" class="el-icon-edit"></el-button>
					  
					  <el-button size="small" type="danger" @click="dialogVisible = true" class="el-icon-delete"></el-button>
					  
		              <!--<el-button size="small" type="danger" @click="handleDelete(scope.$index, users)" class="el-icon-delete"></el-button>-->
		            </template>
		          </el-table-column>
		      </el-table> 
			
		</div>
		        <!--新增/编辑界面-->
		    <el-dialog :title="titleMap[dialogStatus]" :visible.sync="FormVisible" :close-on-click-modal="false" class="edit-form"
		    :before-close="handleClose">
		      <el-form :model="Form" label-width="80px" :rules="editFormRules" ref="Form">
		          <el-form-item label="Name" prop="name">
		            <el-input v-model="Form.name" auto-complete="off"></el-input>
		          </el-form-item>
				  
		          <el-form-item label="Gender">
					<el-radio-group v-model="Form.Gender">
						<el-radio label="Male" value="Male">Male</el-radio>
						<el-radio label="Female" value="Female">Female</el-radio>
					</el-radio-group>
		          </el-form-item>
				  
		          <el-form-item label="Tel">
		            <el-input v-model="Form.Tel"></el-input>
		          </el-form-item>
		          <el-form-item label="Birthday" :picker-options="pickerOptions">
		            <div>
		                <el-date-picker v-model="Form.data" type="date" placeholder="Birthday" format="yyyy-MM -dd"
		            value-format="yyyy-MM-dd"></el-date-picker>
		            </div>
		          </el-form-item>
		          <el-form-item label="Interests">
		            <el-input type="textarea" v-model="Form.desc"></el-input>
		          </el-form-item>         
		        </el-form>
		        <div slot="footer" class="dialog-footer">
		          <el-button @click.native="handleCancel('Form')" class="dialog-close">CANCEL</el-button>
		          <el-button v-if="addBtnshow" type="primary" @click.native="confirmAdd('Form')" class="add-save">SAVE</el-button>
		          <el-button v-if="editBtnshow" type="primary" @click.native="confirmEdit('Form')" class="edit-save">SAVE</el-button>
				  <el-button v-if="copyBtnshow" type="primary" @click.native="confirmAdd('Form')" class="copy-save">Copy</el-button>
				  
		        </div>
		      </el-dialog>     
			  
			  <!--削除界面-->	
			<el-dialog
				class="del-dialog"
			  title="Warning"
			  :visible.sync="dialogVisible"
			  width="30%"
			  :before-close="handleClose">
			  <span>Are you sure you want to delete this item?</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">Cancel</el-button>
			    <el-button type="primary" v-on:click="delUser" class="ok-btn">OK</el-button>
			  </span>
			</el-dialog>
	
	
	</v-card>
	
	</div>
		
		
		
</template>

<script>
  var _index;
  export default {
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        titleMap: {
            addEquipment:'User Profile_New',
            editEquipment: "User Profile_Edit",
			copyEquipment: "User Profile_Copy"
        },
                 //新增和编辑弹框标题
        dialogStatus: "",
        Form: {
		  id: 0,
		  name: '',
		  Gender:'',
          Tel:'',
          data: '',
          desc: '',      
        },
        users:[
        {name:'A',Gender:'Male',Tel:'13',data:'',desc:'11'},
        {name:'B',Gender:'Male',Tel:'12',data:'',desc:'22'},
        {name:'C',Gender:'Female',Tel:'56',data:'',desc:'99'}
        ],  
        editFormRules:{
          name: [
            { required: true, message: 'Please enter name', trigger: 'blur' }
          ],
          Tel: [
            { required: true,  trigger: 'blur' }
          ],
          desc: [
            { required: true,  trigger: 'blur' }
          ],
        },
        FormVisible: false,
        currentRow:[],
        ids:[],
        listLoading:'',
        addBtnshow:false,
        editBtnshow:false,
		copyBtnshow:false,
        editLoading:'', 
        dialogStatus: '',
        selected:[],
        editid:'',
        searchForm:[],
		dialogVisible: false
      }
    },
    methods: {
		

	 handleCurrentChange:function(val){  //点击选中
	   console.log(val);
	   this.currentRow = val;
	 },
	 
	 
      selsChange:function(val){  //点击选中
        console.log(val);
        this.selected = val;
      },
	  
	  delUser(us_index){
	  	if(us_index == -1){
	  		this.users={};
	  	}else{
	  	this.users.splice(us_index,1);
	  	}
		this.dialogVisible = false
	  	},
		

	  
      // 点击新增
      addRow(users,event) {
        this.FormVisible = true;
        this.Form = {
          id: 0,
          name: '',
          Gender:'' ,
          Tel:'',
          data:'',
          desc: '',
        };
        this.dialogStatus = "addEquipment"
        this.addBtnshow = true
        this.editBtnshow = false
		this.copyBtnshow = false
      },
      // 点击确定（新增）
      confirmAdd() { 
        // this.users = this.users || []
        this.users.push({
        name: this.Form.name,
        Gender: this.Form.Gender,
        Tel: this.Form.Tel,
        data: this.Form.data,
        desc: this.Form.desc
      })
      // storage.set('users', this.users);
      this.FormVisible = false;      
      },
      //点击编辑
      handleEdit:function(index, row) {
        this.FormVisible = true;
        this.Form = Object.assign({}, row); //这句是关键！！！
        _index = index;
        console.log(index);
        console.log(_index);
        
        this.dialogStatus = "editEquipment"
        this.addBtnshow = false
        this.editBtnshow = true
		this.copyBtnshow = false
      },   
	  
	  handleCopy:function(index, row) {
	    this.FormVisible = true;
	    this.Form = Object.assign({}, row); //这句是关键！！！
	    _index = index;
	    console.log(index);
	    console.log(_index);
	    
	    this.dialogStatus = "copyEquipment"
	    this.addBtnshow = false
	    this.editBtnshow = false
	  	this.copyBtnshow = true
	  },   
	  
	  handleCopy1:function(currentRow) {
	    this.FormVisible = true;
	    this.Form = Object.assign({}, currentRow); //这句是关键！！！
	
	    this.dialogStatus = "copyEquipment"
	    this.addBtnshow = false
	    this.editBtnshow = false
	  	this.copyBtnshow = true
	  },   
	  
	  
      // 点击确定（编辑）  
      confirmEdit(){
        var editdata = _index;
        console.log(editdata);
        this.users[editdata].name=this.Form.name;
        this.users[editdata].Gender=this.Form.Gender;
        this.users[editdata].Tel=this.Form.Tel;
        this.users[editdata].data=this.Form.data;
        this.users[editdata].desc=this.Form.desc;
        this.FormVisible = false;
              
            },
      //点击关闭dialog
      handleClose(done) {
        //  done();
        //  location.reload();
        this.FormVisible = false;
      },     
      //点击取消
      handleCancel(formName) {
        this.FormVisible = false;
      },
      // 删除   
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('Once the item is deleted, it will not be recovered.', 'Are you sure you want to delete it?', {
          confirmButtonText: 'OK',
          cancelButtonText: 'CANCEL',
          type: 'warning'
        }).then(() => {
          this.$message({
            // delete:row.splice(index, 1),
            type: 'success',
            message: 'Successfully deleted!',
            delete: row.splice(index, 1)   //splice 删除对象是数unfuntion组   如果是对象会出现错误  row.solice not is
 
            // url: this.$router.push('/')
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Operation cancelled'
          });
        });
      },
      removeUsers() {
		  
          this.$confirm('This action will permanently delete ' + this.selected.length + ' users, do you want to continue?', 'Tips', {
			confirmButtonText: 'OK',
			cancelButtonText: 'CANCEL',  
			type: 'warning' })
          .then(() => {
          console.log(this.selected);
          var ids = [];
          //提取选中项的id
          $.each(this.selected,(i, users)=> {
          ids.push(users.id);
          });
          // 向请求服务端删除
          //  var resource = this.$resource(this.url);
          resource.remove({ids: ids.join(",") })
          .then((response) => {
          this.$message.success(this.selected.length + 'users deleted!');
          this.getUsers();
          })
          .catch((response) => {
          this.$message.error('Failed to delete!');
          });
          })
          .catch(() => {
          this.$message('Operation cancelled!');
          });
      },
		   
		   
    }, 
  }
</script>


<style>
</style>