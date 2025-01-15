import { useEffect, useState } from 'react';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './index.css'
import { getLocalAccessToken } from '@/shared/utils/token';

interface IProps {
    setUploadedUrls: Function
    disabled?: boolean
    initImageUrlList?: Array<string>
}

const ImageUploaderList = ({ setUploadedUrls, disabled, initImageUrlList }: IProps) => {
    const [fileList, setFileList] = useState<any[]>([]);

    useEffect(() => {
        if (initImageUrlList) {
            const initialFileList = initImageUrlList.map((url, index) => ({
                uid: `${index}`,
                name: `Image-${index + 1}`,
                status: 'done',
                url,
                response: url,
            }));
            setFileList(initialFileList);
        }
    }, [initImageUrlList])

    const handleChange = ({ file, fileList: newFileList }: any) => {
        setFileList(newFileList);

        if (file.status === 'done' || file.status === 'removed') {
            const successfulUploads = newFileList
                .filter((file: any) => file.status === 'done' && file.response)
                .map((file: any) => file.response);

            setUploadedUrls(successfulUploads);
        }
    };

    return (
        <>
            <Upload
                disabled={disabled}
                action={`${process.env.REACT_APP_DOMAIN_URL}/s3/upload`}
                headers={{ "Authorization": `Bearer ${getLocalAccessToken()}` }}
                withCredentials={true}
                name='multipartFile'
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                multiple
                className="large-upload-card"
                showUploadList={{ showRemoveIcon: true, showPreviewIcon: false }}
            >
                {fileList.length < 5 && (
                    <div>
                        <PlusOutlined />
                        <div>{fileList.length}/5</div>
                    </div>
                )}
            </Upload>
        </>
    );
};

export default ImageUploaderList;