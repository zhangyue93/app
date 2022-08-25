import { shallowMount, mount, createLocalVue} from '@vue/test-utils'
import ToDoList from '@/components/Dependency'
import Infor from '@/components/Infor'
import ElementUI from 'element-ui'


const localVue = createLocalVue()
localVue.use(ElementUI)



describe('test ToDoList', () => {
    it('输入框初始值为空字符串', () => {
        const wrapper = shallowMount(ToDoList)
        expect(wrapper.vm.toDoText).toBe('')
    })

	it('待完成列表初始值应该为空数组', () => {
	    const wrapper = shallowMount(ToDoList)
	    expect(wrapper.vm.toDoList.length).toBe(0)
	})
	
	it('已完成列表初始值应该为空数组', () => {
	    const wrapper = shallowMount(ToDoList)
	    expect(wrapper.vm.completedList).toEqual([])
	})
	
	it('输入框值变化的时候，toDoText应该跟着变化', () => {
	    const wrapper = shallowMount(ToDoList)
	    wrapper.find('.to-do-text').setValue('晚上要陪妈妈逛超市')
	    expect(wrapper.vm.toDoText).toBe('晚上要陪妈妈逛超市')
	})
	it('输入框没有值，敲入回车的时候，无变化', () => {
	    const wrapper = shallowMount(ToDoList)
	    const length = wrapper.vm.toDoList.length
	    const input = wrapper.find('.to-do-text')
	    input.setValue('')
	    input.trigger('keyup.enter')
	    expect(wrapper.vm.toDoList.length).toBe(length)
	})
	it('输入框有值，敲入回车的时候，待完成列表将新增一条数据，同时清空输入框', () => {
	    const wrapper = shallowMount(ToDoList)
	    const length = wrapper.vm.toDoList.length
	    const input = wrapper.find('.to-do-text')
	    input.setValue('晚上去吃大餐')
	    input.trigger('keyup.enter')
	    expect(wrapper.vm.toDoList.length).toBe(length + 1)
	    expect(wrapper.vm.toDoText).toBe('')
	})
	
	it('待完成列表点击删除，同时更新toDoList数组', () => {
	    const wrapper = mount(ToDoList,{
			data() {
			    return {
			        toDoText: '',
			        toDoList: ["123"],
			        completedList: ["455"]
			    }
				}
		})
		//console.log(wrapper.html())
	    //wrapper.setData({toDoList: ['睡前看一小时书']})
	    expect(wrapper.vm.toDoList.length).toBe(1)
		const Del = wrapper.find('.wait-to-do')
		//console.log(wrapper.html())
		expect(Del.find('.del').exists()).toBe(true)
	    Del.find('.del').trigger('click')
	    expect(wrapper.vm.toDoList.length).toBe(0)
	})
	
	
	it('点击待完成列表中某项的已完成按钮，数据对应更新', () => {
	    const wrapper = mount(ToDoList,{
	    	data() {
	    	    return {
	    	        toDoText: '',
	    	        toDoList: ["123"],
	    	        completedList: ["455"]
	    	    }
	    		}
	    })
	    //wrapper.setData({toDoList: ['中午饭后吃一个苹果']})
	    expect(wrapper.vm.toDoList.length).toBe(1)
	    expect(wrapper.vm.completedList.length).toBe(1)
	    wrapper.find('.wait-to-do li').find('.move').trigger('click')
	    expect(wrapper.vm.toDoList.length).toBe(0)
	    expect(wrapper.vm.completedList.length).toBe(2)
	})

	
})



describe('Infor', () => {
	
	
	it('New Item-dialog', () => {
	    const wrapper = mount(Infor,{localVue})
		//console.log(wrapper.html())
		const openBtn = wrapper.find('.addbtn')
	    expect(openBtn.exists()).toBe(true)
		expect(wrapper.vm.addBtnshow).toBe(false)//最初dialogが表示しません
		openBtn.trigger('click')
		expect(wrapper.vm.addBtnshow).toBe(true)//ボタンを押すと表示します
		
	})
	
	
	
	it('New Item-save', () => {
	    const wrapper = mount(Infor,{
			localVue,
			data() {
			    return {
			        addBtnshow:true,
			    }
				}
			
			})
			
		const dialog = wrapper.find('.el-dialog__wrapper')
		console.log(dialog.html())
		const saveBtn = dialog.find('.add-save')//save
		saveBtn.trigger('click')
		expect(wrapper.vm.FormVisible).toBe(false)//ボタンを押すと表示します
		expect(wrapper.vm. users.length).toBe(4)//データ1個増えた
		
	})
	
	it('New Item-cancel', () => {
	    const wrapper = mount(Infor,{
			localVue,
			data() {
			    return {
			        addBtnshow:true,
			    }
				}
			
			})
			
		const dialog = wrapper.find('.el-dialog__wrapper')
		console.log(dialog.html())
		const closeBtn = dialog.find('.dialog-close')//save
		closeBtn.trigger('click')
		expect(wrapper.vm.FormVisible).toBe(false)//ボタンを押すと表示します
		expect(wrapper.vm. users.length).toBe(3)//データ増えてない
		
	})
	


	it('Copy-dialog', () => {
	    const wrapper = mount(Infor,{localVue})
		const copyBtn = wrapper.find('.copybtn')
	    expect(copyBtn.exists()).toBe(true)
		const dialog = wrapper.find('.el-dialog__wrapper')
		expect(dialog.exists()).toBe(true)
		expect(wrapper.vm.copyBtnshow).toBe(false)//最初dialogが表示しません
		copyBtn.trigger('click')
		expect(wrapper.vm.copyBtnshow).toBe(true)//ボタンを押すと表示します
		
	})


	it('Copy-save', () => {
	    const wrapper = mount(Infor,{
			localVue,
			data() {
			    return {
			        copyBtnshow:true,
			    }
				}
			
			})
		expect(wrapper.vm. users.length).toBe(3)
		const dialog = wrapper.find('.el-dialog__wrapper')
		const copyBtn = dialog.find('.copy-save')//save
		copyBtn.trigger('click')
		expect(wrapper.vm.FormVisible).toBe(false)//ボタンを押すと表示します
		expect(wrapper.vm. users.length).toBe(4)//データ1個増えた
		
	})
	
		



	it('Edit-dialog', async() => {
	    const wrapper = mount(Infor,{localVue})
		await wrapper.vm.$nextTick()
		//console.log(wrapper.html())
		const Table = wrapper.find('.el-table')
		const editBtn = Table.find('.el-icon-edit')  
		expect(wrapper.vm.editBtnshow).toBe(false)
		editBtn.trigger('click')
		expect(wrapper.vm.editBtnshow).toBe(true)
	})
	
	
	
	
	it('Edit-edit', async() => {
	    const wrapper = mount(Infor,{
			localVue,
			data() {
			    return {
			        editBtnshow:true,
			    }
				}
			
			})
		await wrapper.vm.$nextTick()
		const dialog = wrapper.find('.el-dialog__wrapper')
		const saveBtn = dialog.find('.edit-save')//save
		expect(wrapper.vm. users.length).toBe(3)
		saveBtn.trigger('click')
		expect(wrapper.vm.FormVisible).toBe(false)
		expect(wrapper.vm. users.length).toBe(3)//データ増えてない
		
	})
	
	
	it('Delete-dialog', async() => {
	    const wrapper = mount(Infor,{localVue})
		await wrapper.vm.$nextTick()
		const delBtn = wrapper.find('.el-icon-delete')
		expect(delBtn.exists()).toBe(true)
		expect(wrapper.vm.dialogVisible).toBe(false)
		delBtn.trigger('click')
		expect(wrapper.vm.dialogVisible).toBe(true)
	
	})
	
	it('Delete-delete', () => {
	    const wrapper = mount(Infor,{
			localVue,
			data() {
			    return {
			        dialogVisible:true,
			    }
				}
			
			})
		const dialog = wrapper.find('.del-dialog')
		const okBtn = dialog.find('.ok-btn')
		expect(okBtn.exists()).toBe(true)
		expect(wrapper.vm. users.length).toBe(3)
		okBtn.trigger('click')
		expect(wrapper.vm.dialogVisible).toBe(false)
		expect(wrapper.vm. users.length).toBe(2)//データ増えてない
		
	})





})