import { useEffect, useState } from 'react';
import { Upload, UploadProps, message } from 'antd';
import './index.css'
import { getLocalAccessToken } from '@/shared/utils/token';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

interface IProps {
    initImageUrl?: string
    setUploadedUrl: Function
}

const ImageUploader = ({ setUploadedUrl, initImageUrl }: IProps) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    useEffect(() => {
        if (initImageUrl) {
            setImageUrl(initImageUrl);
        }
    }, [])

    const handleChange: UploadProps['onChange'] = (info) => {
        console.log('info', info.file)
        if (info.file.status === 'error') {
            setLoading(false);
            message.error("서버 이슈로 이미지 올리기기에 실패했습니다.")
            return;
        }
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setLoading(false);
            setImageUrl(info.file.response);
            setUploadedUrl(info.file.response);
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <>
            <Upload
                action={`${process.env.REACT_APP_DOMAIN_URL}/s3/upload`}
                headers={{ "Authorization": `Bearer ${getLocalAccessToken()}` }}
                withCredentials={true}
                name='multipartFile'
                listType="picture-circle"
                onChange={handleChange}
                className="avatar-uploader"
                showUploadList={false}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', borderRadius: '50%' }} /> : uploadButton}
            </Upload>
        </>
    );
};

export default ImageUploader;