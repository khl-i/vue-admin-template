<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="filter.title" placeholder="Title" style="width: 300px;margin-right:15px;" class="filter-item"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="作者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发行日期" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.issue_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pagination.page"
      :page-sizes="[10, 20, 50]"
      :page-size.sync="pagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"> 
    </el-pagination>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="temp.author" />
        </el-form-item>
        <el-form-item label="发行日期" prop="issue_date">
          <el-date-picker 
            v-model="temp.issue_date" 
            type="datetime" 
            placeholder="Please pick a date" 
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createArticle, updateArticle, fetchList, deleteArticle } from '@/api/article'
import dayjs from 'dayjs'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      pagination: {
          page: 1,
          size: 10,
          total: 0,
          sorts: [
            {
              field: "issue_date",
              order: "desc"
            }
          ],
      },
      filter: {
          title: "",
      },
      list: null,
      listLoading: true,
      temp: {
        title: '',
        author: '',
        issue_date: new Date(),
      },
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogFormVisible: false,
      dialogStatus: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList(this.pagination).then(response => {
        this.list = response.data.list
        this.pagination.total = response.data.total
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        title: '',
        author: '',
        issueDate: new Date(),
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.issue_date = this.formatDate(this.temp.issue_date)
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    formatDate(date) {
      if (!date) return ''
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateArticle(this.temp).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      deleteArticle(row.id).then(() => {
        this.$notify({
              title: 'Success',
              message: 'Delete Successfully',
              type: 'success',
              duration: 2000
            })
        this.list.splice(index, 1)
      })
    },
    handleSizeChange(val) {
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.fetchData()
    }
  }
}
</script>
